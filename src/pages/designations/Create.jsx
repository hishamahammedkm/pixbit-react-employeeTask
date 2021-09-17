import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddminHeader from "../../components/AdminHeader";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
// import {
//   addDesignation,
//   getDesignations,
//   setStatus,
// } from "../store/slices/employeeSlice";
import Alert from "../../components/Alert";
import { useHistory } from "react-router-dom";
import Tab from "../../components/Tab";
import {
  useCreateDesignationMutation,
  useGetDesignationsQuery,
} from "../../redux/services/employee";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  postBtn: {
    margin: "10px",
  },
}));
const AddDesignation = () => {
  const [createDesignation, { isSuccess, error }] =
    useCreateDesignationMutation();
  const des = useGetDesignationsQuery();
  const history = useHistory();
  // const isLoading = useSelector((state) => state.employee.loading);
  const isSuccss = useSelector((state) => state.employee.success);

  console.log("isSuccss===", isSuccss);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isAlert, setIsAlert] = useState(isSuccss);
  // useEffect(() => {
  //   setIsAlert(isSuccss);
  // }, [isSuccss]);
  const [designation_name, setDesignation_name] = useState("");
  const [isErrorText, setIsErrorText] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!designation_name) {
      setIsErrorText(true);
      return;
    }
    try {
      const res = await createDesignation({ designation_name });
      if (error) {
        alert('failed')
       return
      }
      history.push("/designations");
    } catch (error) {
      console.log(error);
    }

    // dispatch(addDesignation({ designation_name, history }));
  };

  // useEffect(() => {
  //   // dispatch(getDesignations());
  //   return () => {
  //     // dispatch(setStatus(false));
  //   };
  // }, [isLoading]);
  return (
    <>
      {/* <AddminHeader /> */}
      <Tab tab={1} />
      <Container component="main" maxWidth="lg">
        {/* {isAlert && <Alert />} */}

        <div className={classes.paper}>
          <Container className={classes.wrapper}>
            <Avatar className={classes.avatar}>
              {/* <PersonAddIcon /> */}
              <WorkOutlineOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Designation
            </Typography>
          </Container>
          {/* <Typography component="h1" variant="h5">
            Create Designation
          </Typography> */}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="designation"
                  name="designation"
                  variant="outlined"
                  required
                  fullWidth
                  id="designation"
                  label="Designation"
                  autoFocus
                  error={isErrorText}
                  helperText={
                    isErrorText ? "please enter atleast one charector" : ""
                  }
                  value={designation_name}
                  onChange={(e) => {
                    setIsErrorText(false);
                    setDesignation_name(e.target.value);
                    if (isAlert) {
                      // dispatch(setStatus(false));
                    }
                    setIsAlert(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  component="label"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  className={classes.postBtn}
                  color="secondary"
                  variant="contained"
                  component="label"
                  onClick={() => history.push("/designations")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddDesignation;
