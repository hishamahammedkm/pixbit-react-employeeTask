import { AppBar, Avatar, Button, CssBaseline, makeStyles, Toolbar, Typography } from "@material-ui/core"
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  
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
        textDecoration:'none'
    },
    name: {
        marginRight: 10
    }


}));


const UserHeader = () => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Larvel
                    </Typography>
                    <nav>

                        {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Login
                        </Link> */}
                        {/* <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Register
                        </Link> */}
                        <Link className={classes.link} to="/login">Login</Link>
                        <Link className={classes.link} to="/register">Register</Link>
                    </nav>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default UserHeader
