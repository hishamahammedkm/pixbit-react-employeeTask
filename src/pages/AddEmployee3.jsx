import {
  Container,
  Typography,
  makeStyles,
  Grid,
  //   TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import AdminHeader from "../components/AdminHeader";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useEffect, useRef, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import Alert from "../components/Alert";
import DateTime from "../components/form/DateTime";
import {
  addEmployee,
  getDesignations,
  getEmployees,
} from "../store/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import Tab from "../components/Tab";
import { Formik, Form, useFormikContext } from "formik";

import TextField from "../components/form/TextField";
import FileInput from "../components/form/fileInput";
import * as Yup from "yup";
import Select from "../components/form/select";
import RadioForm from "../components/form/radio";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginTop:''
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  gender: {
    display: "flex",
    flexDirection: "row",
  },
  postBtn: {
    margin: "10px",
  },
}));

const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  mobile: null,
  landline: null,
  email: "",
  join_date: null,
  date_of_birth: null,

  status: null,
  gender: null,
  profile_picture: null,
  resume: null,
  present_address: "",
  permanent_address: "",

  designation_id: null,
};
const FORM_VALIDATION = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  present_address: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  permanent_address: Yup.string().required("Required"),
  mobile: Yup.number().required("Required"),
  landline: Yup.number().required("Required"),
  join_date: Yup.date().nullable().required("Required"),
  date_of_birth: Yup.date().nullable().required("Required"),
  designation_id: Yup.number().required("Required"),
  status: Yup.string().required("Required"),
  profile_picture: Yup.mixed().required("Required"),
  resume: Yup.mixed().required("Required"),
});

const AddEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInputEl = useRef(null);
  const fileResume = useRef(null);

  const isSuccss = useSelector((state) => state.employee.success);
  const [isAlert, setIsAlert] = useState(isSuccss);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsAlert(isSuccss);
  }, [isSuccss]);
  const isLoading = useSelector((state) => state.employee.loading);
  const designationData = useSelector((state) => state.employee.designations);

  // const [profile_picture, setProfile_picture] = useState(null);
  // const [resume, setResume] = useState(null);

  // const [employeeData, setEmployeeData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   designation_id: "",
  //   gender: "",
  //   mobile: null,
  //   landline: null,
  //   email: "",
  //   present_address: "",
  //   permanent_address: "",
  //   status: "",

  //   resume: null,
  // });

  // const [join_date, setJoin_date] = useState(null);
  // const [date_of_birth, setDate_of_birth] = useState(null);
  // const handleChange = (e) => {
  //   setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  //   console.log(employeeData);
  // };
  // console.log(employeeData);

  const [checkBoxAddress, setCheckBoxAddress] = useState(false);
  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
    // setEmployeeData({
    //   ...employeeData,
    //   permanent_address: employeeData.present_address,
    // });
    // console.log("employeeData---", employeeData);
    // if (checkBoxAddress) {
    //   setFieldValue("permanent_address", values.present_address);
    // }
  };

  const classes = useStyles();

  //   const handleSubmit = (e) => {

  //     const formData = new FormData();
  //     formData.append("first_name", employeeData.first_name);
  //     formData.append("last_name", employeeData.last_name);
  //     formData.append("join_date", new Date(join_date).toLocaleDateString());
  //     formData.append(
  //       "date_of_birth",
  //       new Date(date_of_birth).toLocaleDateString()
  //     );
  //     // formData.append("designation_id", employeeData.designation_id);
  //     formData.append("designation_id", employeeData.designation_id.toString());
  //     formData.append("gender", employeeData.gender);
  //     formData.append("status", employeeData.status);
  //     formData.append("email", employeeData.email);
  //     formData.append("mobile", employeeData.mobile);
  //     formData.append("landline", employeeData.landline);
  //     formData.append("present_address", employeeData.present_address);
  //     formData.append("permanent_address", employeeData.permanent_address);
  //     formData.append(
  //       "profile_picture",
  //       profile_picture,
  //       profile_picture?.name || ""
  //     );
  //     formData.append("resume", resume, resume?.name);

  //     // console.log("form Data--------", formData);
  //     // console.log('employeeData', employeeData);
  //     // console.log("designation_id", employeeData.designation_id);

  //     dispatch(addEmployee({ formData, history }));
  //   };
  useEffect(() => {
    dispatch(getDesignations());
  }, []);

  return (
    <>
      {/* <AdminHeader /> */}
      <Tab tab={0} />

      <Container component="main" maxWidth="lg">
        {/* {isAlert && <Alert />} */}

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Employee
          </Typography>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log(values);
              const formData = new FormData();
              formData.append("first_name", values.first_name);
              formData.append("last_name", values.last_name);
              formData.append(
                "join_date",
                new Date(values.join_date).toLocaleDateString()
              );
              formData.append(
                "date_of_birth",
                new Date(values.date_of_birth).toLocaleDateString()
              );
              // formData.append("designation_id", employeeData.designation_id);
              formData.append(
                "designation_id",
                values.designation_id.toString()
              );
              formData.append("gender", values.gender);
              formData.append("status", values.status);
              formData.append("email", values.email);
              formData.append("mobile", values.mobile);
              formData.append("landline", values.landline);
              formData.append("present_address", values.present_address);
              formData.append("permanent_address", values.permanent_address);
              formData.append(
                "profile_picture",
                values.profile_picture,
                values.profile_picture?.name || ""
              );
              formData.append("resume", values.resume, values.resume?.name);

              // console.log("form Data--------", formData);
              // console.log('employeeData', employeeData);
              // console.log("designation_id", employeeData.designation_id);

              dispatch(addEmployee({ formData, history }));
            }}
          >
            <Form>
              <div className={classes.form}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField name="first_name" label="First Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="last_name" label="Last Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTime name="join_date" label="Joing Date" />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTime name="date_of_birth" label="Date of Birth" />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name="designation_id"
                      label="designation"
                      options={designationData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RadioForm name="gender" className={classes.gender} />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      label="Status"
                      name="status"
                      options={[
                        { id: "Permenent", name: "Permenent" },
                        { id: "Temporary", name: "Temporary" },
                        { id: "Trainee", name: "Trainee" },
                      ]}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="mobile" label="Mobile" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="landline" label="Landline" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="present_address"
                      label="Present Address"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkBoxAddress}
                          onChange={checkBoxAddressChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Same as present Address"
                    />
                    <TextField
                      name="permanent_address"
                      label="Permenent Address"
                      // value={checkBoxAddress ?}
                      multiline
                      isChecked={checkBoxAddress}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Select
                      label="Status"
                      name="status"
                      options={[
                        { id: "Permenent", name: "Permenent" },
                        { id: "Temporary", name: "Temporary" },
                        { id: "Trainee", name: "Trainee" },
                      ]}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <FileInput name="profile_picture" label="Profile Picture" />
                  </Grid>
                  <Grid item xs={12}>
                    <FileInput name="resume" label="Resume" />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      component="label"
                      //   onClick={handleSubmit}
                    >
                      Submit
                    </Button> */}
                    <Button type="submit" color="primary" variant="contained">
                      Submit Form
                    </Button>
                    <Button
                      className={classes.postBtn}
                      color="secondary"
                      variant="contained"
                      component="label"
                      onClick={() => history.push("/employeelist")}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Form>
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default AddEmployee;
