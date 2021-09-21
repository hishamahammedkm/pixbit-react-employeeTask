import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";
import UserHeader from "../../components/UserHeader";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { set } from "date-fns";
import Alert from "../../components/AuthErrorAlert";                       
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLoginMutation } from "../../redux/services/employee";
import LoadingButton from '@mui/lab/LoadingButton';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    containerDiv: {
        marginTop: "130px",
    },
}));
const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});
export default function Login() {
    const auth = localStorage.getItem("token");
    const [login, { isLoading,error:LoginError}] = useLoginMutation();
   
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,

        onSubmit: async (loginData) => {
            setAuthError(true)
            try {
                const payload = await login(loginData);
                localStorage.setItem("token", payload.data.data.access_token);
                history.push("/");
            } catch (error) {
    
                
            }
        },
    });

    const [authError, setAuthError] = useState();
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isAlert, setIsAlert] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
    }
    return (
        <>
            {!auth ? (
                <div className={classes.containerDiv}>
                    <UserHeader />

                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <form className={classes.form} onSubmit={formik.handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    // type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formik.values.email}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAuthError(false)
                                    }}
                                    error={formik.touched.email && Boolean(formik.errors.email)|| authError && LoginError?.data?.message}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAuthError(false)
                                    }}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password || authError && LoginError?.data?.message)
                                    }
                                    helperText={formik.touched.password && formik.errors.password || authError && LoginError?.data?.message}
                                />

                                <LoadingButton
                                    type='submit'
                                
                                    loading={isLoading}
                                    loadingPosition="center"
                                    variant="contained"
                                    fullWidth
                                    color="success"
                                    size="large"
                                >
                                    Login
                                </LoadingButton>


                                <Grid style={{marginTop:'10px'}} container justifyContent="center">
             
                                    <Grid item>
                                        <Link to="/register">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={3}>
                            <Copyright />
                        </Box>
                    </Container>
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </>
    );
}
