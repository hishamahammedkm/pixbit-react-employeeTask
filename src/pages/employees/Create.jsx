import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Paper,
  //   TextField,
  Button,
  InputAdornment,
  IconButton,
  Avatar,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useEffect, useRef, useState } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory,useLocation } from "react-router-dom";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import Alert from "../../components/Alert";
import DateTime from "../../components/form/DateTime/index";
import { useDispatch, useSelector } from "react-redux";
import Tab from "../../components/Tab";
import { Formik, Form, useFormikContext } from "formik";

import TextField from "../../components/form/TextField";
import FileInput from "../../components/form/FileInput";
import * as Yup from "yup";
import Select from "../../components/form/Select";
import RadioForm from "../../components/form/Radio";
import {
  useCreateEmployeeMutation,
  useGetDesignationsQuery,
} from "../../redux/services/employee";
import AddressCheckBox from "../../components/form/AddressCheckBox";
import useDocumentTitle from "../../hooks/useDocumentTitle";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),

    margin: theme.spacing(0, 10, 5),

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(8, 4, 3),
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    marginLeft: '-13px',





  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
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
  addressCheckBox: false,
};
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const SUPPORTED_RESUME_FORMATS = [
  "application/pdf",
  "application/doc",
  "application/xls",
];
const SUPPORTED_PROFILE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];

const FORM_VALIDATION = Yup.object().shape({
  first_name: Yup.string().min(1, 'minimum one charector').required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email(),//.required("Required"),
  present_address: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  permanent_address: Yup.string().required("Required"),
  mobile: Yup.string().nullable().matches(phoneRegExp, 'Mobile number is not valid').required('Required'),
  landline: Yup.string().nullable().matches(phoneRegExp, 'Landline number is not valid').required('Required'),
  join_date: Yup.date().nullable().typeError('Date must be in YYYY/MM/DD format').required("Required"),
  date_of_birth: Yup.date().nullable().typeError('Date must be in YYYY/MM/DD format').required("Required"),
  designation_id: Yup.number().required("Required"),
  status: Yup.string().required("Required"),
  profile_picture: Yup.mixed().required("Required").test(
    "fileFormat",
    "Profile picture must be either in jpeg, png, gif, webp",
    (value) => value && SUPPORTED_PROFILE_FORMATS.includes(value.type)
  ),
  profile_picture: Yup.mixed().required("Required"),

  // resume: Yup.mixed().required("Required").test(
  //   "fileFormat",
  //   "Resume must be either in pdf, doc, xls",
  //   (value) => value && SUPPORTED_RESUME_FORMATS.includes(value.type)
  // ),
  resume: Yup.mixed().required("Required")

});

const AddEmployee = () => {
  const location = useLocation();
  const [document_title, setDoucmentTitle] = useDocumentTitle(`Create Employee | Admin Templates`);
  const [createEmployee, { isLoading, isSuccess, isError, error }] = useCreateEmployeeMutation();


  const { data: desData } = useGetDesignationsQuery();


  const history = useHistory();
  const fileInputEl = useRef(null);
  const fileResume = useRef(null);


  const classes = useStyles();
  useEffect(() => {
 
    if (isSuccess) {
      history.push("/employees");
    }

  }, [isLoading])

  return (
    <>

      <Tab tab={1} />

      <Paper className={classes.paper}>
        <Container className={classes.wrapper}>

          <Typography component="h1" variant="h5">
            Create Employee
          </Typography>
        </Container>

        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, { setFieldError,setErrors }) => {

            console.log('values',values);
            const formData = new FormData();
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append(
              "join_date", new Date(values.join_date).toLocaleDateString('zh-Hans-CN')
            );

            formData.append(
              "date_of_birth", new Date(values.date_of_birth).toLocaleDateString('zh-Hans-CN')
            );
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

            
            try {
              const res = await createEmployee(formData);
              console.log(res);
              if(res?.error?.data?.errors){
                setErrors({email:!!res?.error?.data?.errors?.email && res?.error?.data?.errors?.email[0],
                  resume:!!res?.error?.data?.errors?.resume && res?.error?.data?.errors?.resume[0],
                  profile_picture:!!res?.error?.data?.errors?.profile_picture && res?.error?.data?.errors?.profile_picture[0]

                
                })
              }
              // if (res?.error?.data?.errors?.email) {
              //   setFieldError('email', res?.error?.data?.errors?.email[0])
              // }
              // if (res?.error?.data?.errors?.resume) {
              //   setFieldError('resume', res?.error?.data?.errors?.resume[0])
              // }

              // if (res?.error?.data?.errors?.profile_picture) {
              //   setFieldError('profile_picture', res?.error?.data?.errors?.profile_picture[0])

              // }
       
              if(res.error.status == 'FETCH_ERROR'){
                alert('No Internet Connection')
              }

            } catch (error) {
              console.log(error);
            }
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
                    label="Designation"
                    // options={designationData}
                    options={desData?.data}
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
                      { id: "1", name: "Temporary" },
                      { id: "2", name: "Trainee" },
                      { id: "3", name: "Permanent" },
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
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AddressCheckBox />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    name="permanent_address"
                    label="Permanent Address"

                    multiline
                    rows={3}

                  />
                </Grid>

                <Grid item xs={12}>
                  <FileInput name="profile_picture" label="Profile Picture" />
                </Grid>
                <Grid item xs={12}>
                  <FileInput name="resume" label="Resume" />
                </Grid>
                <Grid item xs={12}>

                  <Button type="submit" color="primary" variant="contained">
                    Submit
                  </Button>
                  <Button
                    className={classes.postBtn}
                    color="inherit"
                    variant="contained"
                    component="label"
                    onClick={() => history.push("/employees")}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Form>
        </Formik>
      </Paper>
      {/* </Container> */}
    </>
  );
};

export default AddEmployee;
