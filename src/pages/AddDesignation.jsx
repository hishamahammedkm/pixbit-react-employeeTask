import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddminHeader from "../components/AdminHeader";
import {
  addDesignation,
  getDesignations,
  setStatus,
} from "../store/slices/employeeSlice";
import Alert from "../components/Alert";
import { useHistory } from "react-router";
import Tab from '../components/Tab'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop:'-5px',
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
  const history = useHistory();
  const isLoading = useSelector((state) => state.employee.loading);
  const isSuccss = useSelector((state) => state.employee.success);

  console.log("isSuccss===", isSuccss);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isAlert, setIsAlert] = useState(isSuccss);
  useEffect(() => {
    setIsAlert(isSuccss);
  }, [isSuccss]);
  const [designation_name, setDesignation_name] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addDesignation({ designation_name }));
    console.log(2);
  };

  useEffect(() => {
    dispatch(getDesignations());
  }, [isLoading]);
  return (
    <>
      {/* <AddminHeader /> */}
      <Tab tab={1} />
      <Container component="main" maxWidth="lg">
        {isAlert && <Alert />}

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Designation
          </Typography>
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
                  value={designation_name}
                  onChange={(e) => {
                    setDesignation_name(e.target.value);
                    if (isAlert) {
                      dispatch(setStatus(false));
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
                  onClick={() => history.push("/designationlist")}
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
