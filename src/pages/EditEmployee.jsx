import {
  Container,
  Typography,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import AdminHeader from "../components/AdminHeader";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "../components/Alert";
import Tab from '../components/Tab'
import {
  addEmployee,
  editEmployee,
  getDesignations,
  getEmployees,
} from "../store/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
const EditEmployee = () => {
  const isSuccss = useSelector((state) => state.employee.success);
  const [isAlert, setIsAlert] = useState(isSuccss);
  useEffect(() => {
    setIsAlert(isSuccss);
  }, [isSuccss]);
  const params = useParams();
  const id = params.id;
  // console.log(id);
  const employees = useSelector((state) => state.employee.employees);
  console.log(employees);
  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        return myArray[i];
      }
    }
  }
  const editData = search(id, employees);
  console.log("editData", editData);
  console.log(search(id, employees));

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employee.loading);
  const designationData = useSelector((state) => state.employee.designations);

  const [join_date, setJoin_date] = useState(editData?.join_date);
  const [date_of_birth, setDate_of_birth] = useState(editData?.date_of_birth);
  const [employeeData, setEmployeeData] = useState({
    first_name: editData.first_name,
    last_name: editData.last_name,
    designation_id: editData.designation_id,
    gender: editData.gender,
    mobile: editData.mobile,
    landline: editData.landline,
    email: editData.email,

    present_address: editData.present_address,
    permanent_address: editData.permanent_address,
    status: editData.status,
  });

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };
  console.log(employeeData);
  const [checkBoxAddress, setCheckBoxAddress] = useState(false);
  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
    setEmployeeData({
      ...employeeData,
      permanent_address: employeeData.present_address,
    });
    // console.log('employeeData---',employeeData)
  };

  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();

    var object = {};
    const formData = new FormData();
    formData.append("first_name", employeeData.first_name);
    formData.append("last_name", employeeData.last_name);
    formData.append("join_date", new Date(join_date).toLocaleDateString());
    formData.append(
      "date_of_birth",
      new Date(date_of_birth).toLocaleDateString()
    );
    formData.append("designation_id", employeeData.designation_id);
    formData.append("gender", employeeData.gender);
    formData.append("status", employeeData.status);
    formData.append("email", employeeData.email);
    formData.append("mobile", employeeData.mobile);
    formData.append("landline", employeeData.landline);
    formData.append("present_address", employeeData.present_address);
    formData.append("permanent_address", employeeData.permanent_address);

    formData.forEach(function (value, key) {
      object[key] = value;
    });
    console.log("object", object);
    dispatch(editEmployee({ id, object }));
  };
  useEffect(() => {
    dispatch(getDesignations());
  }, []);
  return (
    <>
      {/* <AdminHeader /> */}
      <Tab tab={0} />
      <Container component="main" maxWidth="lg">
        {isAlert && <Alert />}
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Employee
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="first_name"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  value={employeeData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="last_name"
                  name="last_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Last Name"
                  value={employeeData.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    inputVariant="outlined"
                    margin="normal"
                    fullWidth
                    id="joinigDate"
                    label="Joinig date"
                    format="MM/dd/yyyy"
                    name="join_date"
                    value={join_date}
                    onChange={(e) => setJoin_date(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    inputVariant="outlined"
                    fullWidth
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of Birth"
                    format="MM/dd/yyyy"
                    name="date_of_birth"
                    value={date_of_birth}
                    onChange={(e) => setDate_of_birth(e)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Designations
                  </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="designations"
                    id="designation_id"
                    name="designation_id"
                    onChange={handleChange}
                    value={employeeData.designation_id}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {designationData.map((item) => (
                      <MenuItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value={"React"}>React</MenuItem>
                                          <MenuItem value={"PHP"}>PHP</MenuItem>
                                          <MenuItem value={"Flutter"}>Flutter</MenuItem> */}
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    className={classes.gender}
                    aria-label="gender"
                    name="gender"
                    value={employeeData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                    {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="mobile"
                  name="mobile"
                  variant="outlined"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  value={employeeData.mobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="landline"
                  name="landline"
                  variant="outlined"
                  required
                  fullWidth
                  id="landline"
                  label="Landline"
                  value={employeeData.landline}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  value={employeeData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="present_address"
                  name="present_address"
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="present_address"
                  label="Present Address"
                  value={employeeData.presentAddress}
                  onChange={handleChange}
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
                  autoComplete="permanent_address"
                  name="permanent_address"
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="permanent_address"
                  label="Permenent Address"
                  value={employeeData.permanent_address}
                  onChange={handleChange}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Status
                  </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="status"
                    id="status"
                    name="status"
                    onChange={handleChange}
                    value={employeeData.status}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Permenent"}>Permenent</MenuItem>
                    <MenuItem value={"Temporary"}>Temporary</MenuItem>
                    <MenuItem value={"Trainee"}>Trainee</MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                    name="profile_picture"
                    variant="outlined"
                    required
                    fullWidth
                    type="file"
                    id="profile_picture"
                    label="Profile Picture"
                    onChange={handleProfile}
                  /> */}
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                    name="profile_picture"
                    variant="outlined"
                    required
                    fullWidth
                    type="file"
                    id="resume"
                    label="Resume"
                    onChange={handleResume}
                  /> */}
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

export default EditEmployee;
