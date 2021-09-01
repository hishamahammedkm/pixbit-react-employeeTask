import { Container, Typography, makeStyles, Grid, TextField, Button } from '@material-ui/core'
import AdminHeader from '../components/AdminHeader'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    formControl: {

        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    gender: {
        display: 'flex',
        flexDirection: 'row',

    },
    postBtn:{
        margin:'10px'
    }
}))
const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        fname: '',
        lname: '',
        designation: '',
        gender: '',
        mobile: null,
        landline: null,
        email: '',
        presentAddress: '',
        permenentAddress: '',
        status: '',
        profilePicture: null,
        resume: null,
    })

    const [joiningDate, setjoiningDate] = useState(null)
    const [dob, setDob] = useState(null)
    const handleChange = (e) => {

        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })

    }
    console.log(employeeData);
    const [checkBoxAddress, setCheckBoxAddress] = useState(false)
    const checkBoxAddressChange = (e) => {

        setCheckBoxAddress(!checkBoxAddress)
        setEmployeeData({ ...employeeData, permenentAddress: employeeData.presentAddress })


    }

    const classes = useStyles()
    return (
        <>
            <AdminHeader />
            <Container component="main" maxWidth="lg">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Employee Add
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <TextField
                                    autoComplete="fname"
                                    name="fname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First Name"
                                    autoFocus
                                    value={employeeData.fname}
                                    onChange={handleChange}
                                />

                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    autoComplete="lname"
                                    name="lname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Last Name"
                                    value={employeeData.lname}
                                    onChange={handleChange}

                                />

                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        margin="normal"
                                        fullWidth
                                        id="joinigDate"
                                        label="Joinig date"
                                        format="MM/dd/yyyy"
                                        name='joinigDate'
                                        value={joiningDate}
                                        onChange={(e) => setjoiningDate(e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>


                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        fullWidth
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date of Birth"
                                        format="MM/dd/yyyy"
                                        name="dob"
                                        value={dob}
                                        onChange={(e) => setDob(e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>


                            </Grid>
                            <Grid item xs={12}>

                                <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">Designations</InputLabel>
                                    <Select
                                        labelId="designations"
                                        id="designations"
                                        name="designation"
                                        onChange={handleChange}
                                        value={employeeData.designation}
                                    >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                        <MenuItem value={"React"}>React</MenuItem>
                                        <MenuItem value={"PHP"}>PHP</MenuItem>
                                        <MenuItem value={"Flutter"}>Flutter</MenuItem>
                                    </Select>
                                    <FormHelperText></FormHelperText>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup className={classes.gender} aria-label="gender" name="gender" value={employeeData.gender} onChange={handleChange}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
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
                                    autoComplete="presentAddress"
                                    name="presentAddress"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="text"
                                    id="presentAddress"
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
                                    autoComplete="presentAddress"
                                    name="permenentAddress"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="text"
                                    id="presentAddress"
                                    label="Permenent Address"
                                    value={checkBoxAddress ? employeeData.presentAddress : employeeData.permenentAddress}
                                    onChange={handleChange}
                                    multiline

                                />
                            </Grid>
                            <Grid item xs={12}>

                                <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                    <Select
                                        labelId="status"
                                        id="status"
                                        name="status"
                                        onChange={handleChange}
                                        value={employeeData.status}
                                    >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                        <MenuItem value={"Single"}>Single</MenuItem>
                                        <MenuItem value={"Married"}>Married</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                    <FormHelperText></FormHelperText>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                   fullWidth
                                    variant="contained"
                                    component="label"
                                >
                                    Upload Profile Picture
                                    <input
                                        name="profilePicture"
                                        value={employeeData.profilePicture}
                                        onChange={handleChange}
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            
                            </Grid>
                            <Grid item xs={12}>
                            <Button
                                   fullWidth
                                    variant="contained"
                                    component="label"
                                >
                                    Upload Resume
                                    <input
                                        name="resume"

                                        value={employeeData.resume}
                                        onChange={handleChange}
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                            <Button
                                   
                                   color="primary"
                                    variant="contained"
                                    component="label"
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
    )
}

export default AddEmployee
