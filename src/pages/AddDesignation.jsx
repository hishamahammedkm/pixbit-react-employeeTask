import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddminHeader from '../components/AdminHeader'
import { addDesignation } from '../store/slices/employeeSlice';

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
    postBtn:{
        margin:'10px'
    }
}))
const AddDesignation = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    
    const [designation_name, setDesignation_name] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(1);
        dispatch(addDesignation({designation_name}))
        console.log(2);
    }
    return (
        <>
            <AddminHeader />
            <Container component="main" maxWidth="lg">
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
                                    onChange={(e) => setDesignation_name(e.target.value)}
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

export default AddDesignation
