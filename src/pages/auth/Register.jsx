import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright";
import UserHeader from "../../components/UserHeader";
// import { registerUser } from "../store/slices/authSlice";
// import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/AuthErrorAlert";
import { useRegisterMutation } from "../../redux/services/employee";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  containerDiv: {
    marginTop: "130px",
  },
}));

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  // const authError = useSelector((state) => state.auth.error);
  const [authError, setAuthError] = useState(false);

  const [isValid, setIsValid] = useState(false);
  // const dispatch = useDispatch();
  const history = useHistory();
  const [mismatch, setMismatch] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleChange = (e) => {
    setAuthError(false);
    setIsValid(false);
    setMismatch(false);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const checkPassword = userData.password;
    const checkPassword2 = userData.password_confirmation;
    if (checkPassword !== checkPassword2) {
      setMismatch(true);
      return;
    }
    if (checkPassword.length < 8) {
      setIsValid(true);
      return;
    }
    // dispatch(registerUser({ userData, history }));
    try {
      const payload = await register(userData);
      // console.log(payload.data.data.access_token);
      localStorage.setItem("token", payload.data.data.access_token);
      history.push("/employees");
    } catch (error) {
      setAuthError(true);
      console.log(error);
    }
  };
  const classes = useStyles();
  // console.log(userData);
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
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={PostData}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    helperText={isValid ? "Password must be 8 charector" : ""}
                    error={isValid}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    id="password_confirmation"
                    autoComplete="password_confirmation"
                    onChange={handleChange}
                    helperText={mismatch ? "Password did not match" : ""}
                    error={isValid}
                    error={mismatch}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              {authError && <Alert message="this email alreay taken" />}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  );
}
