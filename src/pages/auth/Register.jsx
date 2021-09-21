import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";
import UserHeader from "../../components/UserHeader";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { set } from "date-fns";
import Alert from "../../components/AuthErrorAlert";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from '@mui/lab/LoadingButton'
import { useLoginMutation, useRegisterMutation } from "../../redux/services/employee";
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
    name: yup.string('Enter name').required('Name is required'),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    password_confirmation: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});
export default function Register() {
    const [register, { isLoading, isError, error: registerError }] = useRegisterMutation();
    const isAuth = localStorage.getItem("token")
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",

        },
        validationSchema: validationSchema,

        onSubmit: async (loginData) => {
            setAuthError(true)
            try {
                const payload = await register(loginData);
                localStorage.setItem("token", payload.data.data.access_token);
                history.push("/");
            } catch (error) {
                setAuthError(true);

            }
        },
    });

    const [authError, setAuthError] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isAlert, setIsAlert] = useState(false);
    // const [loginData, setLoginData] = useState({
    //     email: "",
    //     password: "",
    // });

    const classes = useStyles();

    return (
        <>
            {!isAuth ? (
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
                                    id="name"
                                    // type="email"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={formik.values.name}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAuthError(false)
                                    }}

                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"

                                    fullWidth
                                    id="email"
                                    // type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"

                                    value={formik.values.email}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAuthError(false)
                                    }}
                                    error={formik.touched.email && Boolean(formik.errors.email || registerError?.data?.errors?.email)}
                                    helperText={formik.touched.email && formik.errors.email || authError && registerError?.data?.errors?.email}
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
                                        formik.touched.password && Boolean(formik.errors.password) || registerError?.data?.errors?.password
                                    }
                                    helperText={formik.touched.password && formik.errors.password || authError && registerError?.data?.errors?.password && registerError?.data?.errors?.password[0]}

                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"

                                    fullWidth
                                    name="password_confirmation"
                                    label="Confirm Password"
                                    type="password"
                                    id="password_confirmation"
                                    autoComplete="current-password"
                                    value={formik.values.password_confirmation}
                                    // onChange={formik.handleChange}
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setAuthError(false)
                                    }}
                                    error={
                                        formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)
                                        || registerError?.data?.errors?.password
                                    }
                                    helperText={formik.touched.password_confirmation && formik.errors.password_confirmation || authError && registerError?.data?.errors?.password && registerError?.data?.errors?.password[0]}
                                // helperText={formik.touched.password_confirmation && formik.errors.password_confirmation || registerError?.data?.errors?.password ? registerError?.data?.errors?.password[0]:''}
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
                                    Register
                                </LoadingButton>


                                <Grid container justifyContent="center">

                                    <Grid item style={{ marginTop: '10px' }}>
                                        <Link to="/login">{"Already  have an account? Login In"}</Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>

                        <Box mt={3}>
                            <Copyright />
                        </Box>
                    </Container>
                </div>
            ) : <Redirect to="/" />}

        </>
    );
}
