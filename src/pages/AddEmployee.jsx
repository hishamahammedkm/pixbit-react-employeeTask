import {
  Container,
  Typography,
  makeStyles,
  Grid,
  TextField,
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
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import Alert from "../components/Alert";
import {
  addEmployee,
  getDesignations,
  getEmployees,
} from "../store/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import Tab from "../components/Tab";

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
const AddEmployee = () => {
  const dispatch = useDispatch();
  const fileInputEl = useRef(null);
  const fileResume = useRef(null);
  const history = useHistory();
  const isSuccss = useSelector((state) => state.employee.success);
  const [isAlert, setIsAlert] = useState(isSuccss);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsAlert(isSuccss);
  }, [isSuccss]);
  const isLoading = useSelector((state) => state.employee.loading);
  const designationData = useSelector((state) => state.employee.designations);
  const [profile_picture, setProfile_picture] = useState(null);
  const [resume, setResume] = useState(null);

  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    designation_id: "",
    gender: "",
    mobile: null,
    landline: null,
    email: "",
    present_address: "",
    permanent_address: "",
    status: "",

    resume: null,
  });

  const [join_date, setJoin_date] = useState(null);
  const [date_of_birth, setDate_of_birth] = useState(null);
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    console.log(employeeData);
  };
  // console.log(employeeData);
  const [checkBoxAddress, setCheckBoxAddress] = useState(false);
  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
    setEmployeeData({
      ...employeeData,
      permanent_address: employeeData.present_address,
    });
    console.log("employeeData---", employeeData);
  };
  const handleProfile = (e) => {
    console.log("fffffffff");
    setProfile_picture(e.target.files[0]);
  };
  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profile_picture) {
      setIsError(true);
      return;
    }
    if (!resume) return;

    const formData = new FormData();
    formData.append("first_name", employeeData.first_name);
    formData.append("last_name", employeeData.last_name);
    formData.append("join_date", new Date(join_date).toLocaleDateString());
    formData.append(
      "date_of_birth",
      new Date(date_of_birth).toLocaleDateString()
    );
    // formData.append("designation_id", employeeData.designation_id);
    formData.append("designation_id", employeeData.designation_id.toString());
    formData.append("gender", employeeData.gender);
    formData.append("status", employeeData.status);
    formData.append("email", employeeData.email);
    formData.append("mobile", employeeData.mobile);
    formData.append("landline", employeeData.landline);
    formData.append("present_address", employeeData.present_address);
    formData.append("permanent_address", employeeData.permanent_address);
    formData.append(
      "profile_picture",
      profile_picture,
      profile_picture?.name || ""
    );
    formData.append("resume", resume, resume?.name);

    // console.log("form Data--------", formData);
    // console.log('employeeData', employeeData);
    // console.log("designation_id", employeeData.designation_id);

    dispatch(addEmployee(formData));
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
            Add Employee
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
                    required
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
                    required
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
                  <InputLabel
                    style={{ marginLeft: "10px" }}
                    id="demo-simple-select-helper-label"
                  >
                    Designations
                  </InputLabel>
                  <Select
                    required
                    variant="outlined"
                    labelId="designations"
                    id="designation_id"
                    name="designation_id"
                    onChange={handleChange}
                    value={employeeData.designation_id}
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    {designationData.map((item) => (
                      // <MenuItem key={item.id} value={item.name}>
                      <MenuItem key={item.id} value={item.id}>
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
                  type="number"
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
                  type="number"
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
                  value={
                    employeeData.permanent_address
                    // checkBoxAddress
                    //   ? employeeData.present_address
                    //   : employeeData.permanent_address
                  }
                  onChange={handleChange}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel
                    style={{ marginLeft: "10px" }}
                    id="demo-simple-select-helper-label"
                  >
                    Status
                  </InputLabel>
                  <Select
                    variant="outlined"
                    required
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
                <TextField
                  id="profile_picture"
                  name="profile_picture"
                  label="Profile Picture"
                  required
                  helperText={
                    !profile_picture
                      ? "please add profile pic in jpeg format"
                      : ""
                  }
                  error={isError}
                  fullWidth
                  value={profile_picture?.name || ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            fileInputEl.current.click();
                          }}
                          edge="end"
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />

                <input
                  required
                  label="Profile pic"
                  name="profilePicture"
                  id="profilePicture"
                  ref={fileInputEl}
                  type="file"
                  style={{ width: "0", height: "0" }}
                  onChange={handleProfile}
                  hidden
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="resume"
                  variant="outlined"
                  required
                  fullWidth
                  type="file"
                  id="resume"
                  label="Resume"
                  onChange={handleResume}
                /> */}
                <TextField
                  id="resume"
                  name="resume"
                  label="Resume"
                  required
                  helperText={!resume ? "please add resume in pdf format" : ""}
                  error={isError}
                  fullWidth
                  value={resume?.name || ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            fileResume.current.click();
                          }}
                          edge="end"
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />

                <input
                  required
                  label="resume"
                  name="resume"
                  id="resume"
                  ref={fileResume}
                  type="file"
                  style={{ width: "0", height: "0" }}
                  onChange={handleResume}
                  hidden
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
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
                  onClick={() => history.push("/employeelist")}
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

export default AddEmployee;
