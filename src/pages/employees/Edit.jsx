import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Button,
  Checkbox,
  useMediaQuery,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import {
    useGetDesignationsQuery,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../redux/services/employee";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/form/TextField";
import RadioForm from "../../components/form/Radio";
import Select from "../../components/form/Select";
import DateTime from "../../components/form/DateTime";
import FileInput from "../../components/form/FileInput";
import Tab from "../../components/Tab";
const useStyles = makeStyles((theme) => ({
  main_container: {
    margin: theme.spacing(0,10,5),
    padding: theme.spacing(3),
    marginTop:'10px',
   
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
  text_field: {
    marginBottom: theme.spacing(4),
  },
  button_container: {
    marginLeft: theme.spacing(-1),
  },
  mobile_container: {
    marginTop: theme.spacing(12),
    padding: theme.spacing(1),
  },
  mobile_wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2),
  },
  mobile_text_field: {
    marginBottom: theme.spacing(2),
  },
}));

const EmployeeEdit = () => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

  const { data } = useGetEmployeesQuery();
  const { status: desStatus, data: desData } = useGetDesignationsQuery();
  const prevEmployeeData = data;

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id.toString() === nameKey) {
        return myArray[i];
      }
    }
  }
  console.log('prevEmployeeData.data',prevEmployeeData.data);
  console.log('params.id',params.id);
  var resultObject = search(params.id, prevEmployeeData.data);
  const INITIAL_FORM_STATE = {
    first_name: resultObject.first_name,
    last_name: resultObject.last_name,
    email: resultObject.email,
    mobile: resultObject.mobile,
    landline: resultObject.landline,
    designation_id: resultObject.designation_id,
    gender: resultObject.gender,
    present_address: resultObject.present_address,
    permanent_address: resultObject.permanent_address,
    status: resultObject.status,
    join_date: resultObject.join_date,
    date_of_birth: resultObject.date_of_birth,
    // date_of_birth: new Date(resultObject?.date_of_birth).toLocaleDateString(),
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
    designation_id: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  const [checkBoxAddress, setCheckBoxAddress] = useState(false);

  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
  };

  const [updateEmloyee] = useUpdateEmployeeMutation();
  const result = useGetEmployeesQuery();

  const EditEmployeeMatches = useMediaQuery("(min-width:426px)");
  console.log('------desData',desData.data);
  return (
    <>
    <Tab tab={0} />
      {EditEmployeeMatches ? (
        <Paper className={classes.main_container}>
          <Container className={classes.wrapper}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Employee
            </Typography>
          </Container>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log("clicked");
              const object = {
                id: params.id,
                first_name: values.first_name,
                last_name: values.last_name,
                join_date: new Date(values.join_date).toLocaleDateString(),
                date_of_birth: new Date(
                  values.date_of_birth
                ).toLocaleDateString(),
                designation_id: values.designation_id.toString(),
                gender: values.gender,
                status: values.status,
                email: values.email,
                mobile: values.mobile,
                landline: values.landline,
                present_address: values.present_address,
                permanent_address: values.permanent_address,
              };

              updateEmloyee(object)
                .then((payload) => {
            
                  
                  result.refetch();
                  history.push("/employees");
                  console.log(payload);
                })
                .catch((error) => {
            
                });
            }}
          >
            <Form autoComplete="off">
              <Grid container spacing={10}>
                <Grid item xs={6}>
                  <TextField
                    className={classes.text_field}
                    name="first_name"
                    label="First Name"
                  />
                  <TextField
                    className={classes.text_field}
                    name="last_name"
                    label="Last Name"
                  />
                  <TextField
                    className={classes.text_field}
                    name="email"
                    label="Email"
                  />
                  <TextField
                    className={classes.text_field}
                    name="mobile"
                    label="Mobile"
                  />
                  <TextField
                    className={classes.text_field}
                    name="landline"
                    label="Landline"
                  />
                  <DateTime
                    className={classes.text_field}
                    name="join_date"
                    label="Joing Date"
                  />
                  <DateTime
                    className={classes.text_field}
                    name="date_of_birth"
                    label="Date of Birth"
                  />
                  <div>
                    <Grid
                      container
                      spacing={2}
                      className={classes.button_container}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="button"
                          color="secondary"
                          variant="outlined"
                          component="label"
                          onClick={() => history.push("/employees")}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <RadioForm row name="gender" />
                  <Select
                    className={classes.text_field}
                    name="designation_id"
                    label="designation"
                    options={desData.data}
                   
                  />
                  <Select
                    className={classes.text_field}
                    label="Status"
                    name="status"
                    options={[
                      { id: "1", name: "Temporary" },
                      { id: "2", name: "Part Time" },
                      { id: "3", name: "Permanent" },
                    ]}
                  />

                  <TextField
                    className={classes.text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={2}
                  />
                  <div style={{ marginBottom: "25px" }}>
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
                  </div>

                  <TextField
                    className={classes.text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={2}
                    isChecked={checkBoxAddress}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      ) : (
        <Paper className={classes.mobile_container}>
          <Container className={classes.mobile_wrapper}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Edit Employee
            </Typography>
          </Container>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log("clicked");
              const object = {
                id: params.id,
                first_name: values.first_name,
                last_name: values.last_name,
                join_date: new Date(values.join_date).toLocaleDateString(),
                date_of_birth: new Date(
                  values.date_of_birth
                ).toLocaleDateString(),
                designation_id: values.designation_id.toString(),
                gender: values.gender,
                status: values.status,
                email: values.email,
                mobile: values.mobile,
                landline: values.landline,
                present_address: values.present_address,
                permanent_address: values.permanent_address,
              };

              updateEmloyee(object)
                .then((payload) => {
               
                  result.refetch();
                  history.push("/employees");
                  console.log(payload);
                })
                .catch((error) => {
          
                });
            }}
          >
            <Form autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={classes.mobile_text_field}
                    name="first_name"
                    label="First Name"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="last_name"
                    label="Last Name"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="email"
                    label="Email"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="mobile"
                    label="Mobile"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="landline"
                    label="Landline"
                  />
                  <DateTime
                    className={classes.mobile_text_field}
                    name="join_date"
                    label="Joing Date"
                  />
                  <DateTime
                    className={classes.mobile_text_field}
                    name="date_of_birth"
                    label="Date of Birth"
                  />
                  <Select
                    className={classes.mobile_text_field}
                    name="designation_id"
                    label="designation"
                    options={ desData?.data}
                  
                  />
                  <Select
                    className={classes.mobile_text_field}
                    label="Status"
                    name="status"
                    options={[
                      { id: "1", name: "Temporary" },
                      { id: "2", name: "Part Time" },
                      { id: "3", name: "Permanent" },
                    ]}
                  />
                   
                  <RadioForm row name="gender" />
                  <FileInput
                    className={classes.mobile_text_field}
                    name="profile_picture"
                    label="Profile Picture"
                  />
                  <FileInput
                    className={classes.mobile_text_field}
                    name="resume"
                    label="Resume"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={3}
                  />

                  <div style={{ marginBottom: "8px" }}>
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
                  </div>
                  <TextField
                    className={classes.mobile_text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={3}
                    isChecked={checkBoxAddress}
                  />
                  <Grid
                    container
                    spacing={2}
                    className={classes.button_container}
                  >
                    <Grid item>
                      <Button type="submit" color="primary" variant="contained">
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        variant="contained"
                        component="label"
                        onClick={() => history.push("/employees")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      )}
    </>
  );
};

export default EmployeeEdit;