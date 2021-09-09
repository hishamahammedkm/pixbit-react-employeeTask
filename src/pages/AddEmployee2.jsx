import { Button, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/form/TextField";
import DateTime from "../components/form/DateTime";
import Select from "../components/form/select";
import RadioForm from "../components/form/radio";
import { useSelector } from "react-redux";
import FileInput from "../components/form/fileInput";
import AttachFileIcon from "@material-ui/icons/AttachFile";
const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  join_date: null,
  date_of_birth: null,
  designation_id: null,
  status: null,
  gender: null,
  profile_picture: null,
  resume: null,
};

const FORM_VALIDATION = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  join_date: Yup.date().nullable().required("Required"),
  date_of_birth: Yup.date().nullable().required("Required"),
  designation_id: Yup.number().required(),
  status: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  profile_picture: Yup.mixed().required("Required"),
  resume: Yup.mixed().required("Required"),
});
const AddEmployee2 = () => {
  const designationData = useSelector((state) => state.employee.designations);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <Grid item xs={6}>
              <Textfield name="first_name" label="First Name" />
            </Grid>
            <Grid item xs={6}>
              <Textfield name="last_name" label="First Name" />
            </Grid>
            <Grid item xs={2}>
              <DateTime name="join_date" label="Joing Date" />
            </Grid>
            <Grid item xs={2}>
              <DateTime name="date_of_birth" label="Date of Birth" />
            </Grid>
            <Grid item xs={2}>
              <Select
                name="designation_id"
                label="designation"
                options={designationData}
              />
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
              <RadioForm name="gender" />
            </Grid>
            <Grid item xs={12}>
              <FileInput name="profile_picture" />
            </Grid>
            <Grid item xs={12}>
              <FileInput name="resume" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit">Submit Form</Button>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddEmployee2;
