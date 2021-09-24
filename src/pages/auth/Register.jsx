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
import { useHistory,useLocation } from "react-router-dom";
import { set } from "date-fns";
import Alert from "../../components/AuthErrorAlert";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from '@mui/lab/LoadingButton'
import { useLoginMutation, useRegisterMutation } from "../../redux/services/employee";
import useDocumentTitle from "../../hooks/useDocumentTitle";
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
    registerBtn: {
        [theme.breakpoints.down("md")]: {
            fontSize: '18px'

        },
    }
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
    const location = useLocation();
    const [document_title, setDoucmentTitle] = useDocumentTitle(`Register | Admin Templates`);
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

        onSubmit: async (loginData, { setFieldError }) => {

            try {
                const payload = await register(loginData);
                console.log('payload', payload);
                if (payload?.data?.data?.access_token) {
                    localStorage.setItem("token", payload?.data?.data?.access_token);
                    history.push("/");
                }
                if (payload.error.data.errors.email) {
                    setFieldError('email', payload.error.data.errors.email[0])
                }
                if (payload.error.data.errors.password) {
                    setFieldError('password_confirmation', payload.error.data.errors.password[0])
                }


            } catch (error) {
                console.log('error', error);

            }
        },
    });

    const [authError, setAuthError] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isAlert, setIsAlert] = useState(false);

    const classes = useStyles();

    return (
        <>
            {!isAuth ? (
                <div className={classes.paper}>

                    <UserHeader />

                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography className={classes.registerBtn} component="h1" variant="h5">
                                Register
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
                                    onChange={formik.handleChange}


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
                                    onChange={formik.handleChange}

                                    error={formik.touched.email && Boolean(formik.errors.email)}
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
                                    onChange={formik.handleChange}

                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}


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
                                    onChange={formik.handleChange}

                                    error={
                                        formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)

                                    }
                                    helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
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
