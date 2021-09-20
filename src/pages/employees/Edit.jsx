import React, { useEffect, useState } from "react";
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
import DateTime from "../../components/form/DateTime/index";
import FileInput from "../../components/form/FileInput";
import Tab from "../../components/Tab";
import AddressCheckBox from "../../components/form/AddressCheckBox";
const useStyles = makeStyles((theme) => ({
    main_container: {
        margin: theme.spacing(0, 10, 5),
        padding: theme.spacing(3),
        marginTop: "10px",
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
   

    gender: {
        display: "flex",
        flexDirection: "row",
    },
    postBtn: {
        margin: "10px",
    },
   
}));

const EmployeeEdit = () => {
    const classes = useStyles();

    const history = useHistory();
    const params = useParams();

    const { data } = useGetEmployeesQuery();
    const { status: desStatus, data: desData,isLoading,isSuccess, isError,error } = useGetDesignationsQuery();
    const prevEmployeeData = data;

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id.toString() === nameKey) {
                return myArray[i];
            }
        }
    }

    var resultObject = search(params.id, prevEmployeeData.data);
    const dateObj = {
        join_date: new Date(resultObject?.join_date).toLocaleDateString(),
        date_of_birth: new Date(resultObject?.date_of_birth).toLocaleDateString(),
    }

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
        join_date: resultObject?.join_date,

        date_of_birth: resultObject?.date_of_birth,
    };
    const FORM_VALIDATION = Yup.object().shape({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string().email().required("Required"),
        present_address: Yup.string().required("Required"),
        gender: Yup.string().required("Required"),
        permanent_address: Yup.string().required("Required"),
        mobile: Yup.number().typeError('enter a valid mobile number').required("Required").required("Required"),
        landline: Yup.number().required("Required"),
        join_date: Yup.date().nullable().typeError('date must be in YYYY/MM/DD format').required("Required"),
        date_of_birth: Yup.date().nullable().typeError('date must be in YYYY/MM/DD format').required("Required"),
        designation_id: Yup.string().required("Required"),
        status: Yup.string().required("Required"),
    });

    const [checkBoxAddress, setCheckBoxAddress] = useState(false);

    const checkBoxAddressChange = (e) => {
        setCheckBoxAddress(!checkBoxAddress);
    };

    const [updateEmloyee] = useUpdateEmployeeMutation();
    const result = useGetEmployeesQuery();


    return (
        <>
            <Tab tab={1} />

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
                    onSubmit={async(values) => {
                 
                        const object = {
                            id: params.id,
                            first_name: values.first_name,
                            last_name: values.last_name,
                            join_date: new Date(values.join_date),
                            date_of_birth: new Date(
                                values.date_of_birth
                            ),
                            designation_id: values.designation_id.toString(),
                            gender: values.gender,
                            status: values.status,
                            email: values.email,
                            mobile: values.mobile,
                            landline: values.landline,
                            present_address: values.present_address,
                            permanent_address: values.permanent_address,
                        };

                        try {
                            const res = await updateEmloyee(object)
                            
                            history.push("/employees")
                           

                        } catch (error) {
                            history.push("/employees")
                            
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

                                    <TextField
                                        name="permanent_address"
                                        label="Permenent Address"
                                        // value={checkBoxAddress ?}
                                        multiline
                                        rows={3}

                                    />
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

        </>
    );
};

export default EmployeeEdit;
