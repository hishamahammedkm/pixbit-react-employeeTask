import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';

import Alert from "../../components/Alert";
import { useHistory } from "react-router-dom";
import Tab from "../../components/Tab";
import {
  useCreateDesignationMutation,
  useGetDesignationsQuery,
} from "../../redux/services/employee";
const useStyles = makeStyles((theme) => ({
  paper: {
   
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    margin: theme.spacing(3),
    // marginTop:''
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(8, 4, 3),
    },
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  
    padding: theme.spacing(3),
    marginLeft:'-13px',
    
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

  const isSuccss = useSelector((state) => state.employee.success);


  const dispatch = useDispatch();
  const classes = useStyles();
  const [isAlert, setIsAlert] = useState(isSuccss);

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


  };


  return (
    <>

      <Tab tab={2} />
      <Paper  className={classes.paper}>

          <Container className={classes.wrapper}>
  
            
            <Typography  component="h1" variant="h5">
              Create Designation
            </Typography>
          
          </Container>

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
                    isErrorText ? "Enter a designation" : ""
                  }
                  value={designation_name}
                  onChange={(e) => {
                    setIsErrorText(false);
                    setDesignation_name(e.target.value);
                    if (isAlert) {

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
                  color="inherit"
                  variant="contained"
                  component="label"
                  onClick={() => history.push("/designations")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        
      </Paper>
    </>
  );
};

export default AddDesignation;
