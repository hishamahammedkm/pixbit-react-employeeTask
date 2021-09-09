import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import UserHeader from "../components/UserHeader";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useHistory } from "react-router-dom";
import { set } from "date-fns";
import Alert from "../components/AuthErrorAlert";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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

export default function Login() {
  const { handleSubmit, control } = useForm();
  const authError = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const history = useHistory();
  const [isAlert, setIsAlert] = useState(false);

  const handleLogin = (loginData) => {
    console.log("loginData", loginData);
    // e.preventDefault();
    // const checkPassword = loginData.password;
    // if (checkPassword.length < 8) {
    //   setIsValid(true);
    //   return;
    // }
    dispatch(loginUser({ loginData, history }));
  };
  // console.log(loginData);
  const classes = useStyles();

  return (
    <>
      <div className={classes.containerDiv}>
        <UserHeader />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    autoFocus
                    autoComplete="email"
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "email is required" }}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    autoComplete="password"
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Password is required" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                //   disabled={error.submit}
              >
                Sign In
              </Button>
              {authError && <Alert message="invalid email or password" />}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  );
}
