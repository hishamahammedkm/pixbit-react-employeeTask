import { AppBar, Avatar, Button, CssBaseline, makeStyles, Toolbar, Typography } from "@material-ui/core"
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
        a: {
            textDecoration: 'none'
        }
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,


    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        fontSize:'18px',
        color:'black'

    },
    name: {
        marginRight: 10
    }


}));


const AdminHeader = () => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Admin Templates
                    </Typography>
                    <nav>
                        {/* <Link to="/" className={classes.link}>
                           Home
                        </Link> */}
                        {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Home
                        </Link> */}
                        <Link to="/employeelist" className={classes.link}>
                            Employees
                        </Link>
                        {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Employees
                        </Link> */}
                        {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Designations
                        </Link> */}
                        <Link to="/designationlist" className={classes.link}>
                            Designations
                        </Link>
                    </nav>
                    <Typography className={classes.name} >Hello Hisham</Typography>
                    <Avatar >H</Avatar>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AdminHeader
