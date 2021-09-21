import {
  AppBar,
  Avatar,
  Button,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FadeMenu from "./HeaderMenu";
import Tab from './Tab'
const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    a: {
      textDecoration: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontSize: "18px",
    color: "black",
  },
  name: {
    marginRight: 10,
  },
}));





const AdminHeader = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar
        style={{ position: "fixed", top: 0 }}
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Admin Templates
          </Typography>
          <nav>
              <Tab />
             <Link to="/employeelist" className={classes.link}>
              Employees
            </Link>

            <Link to="/designationlist" className={classes.link}>
              Designations
            </Link> 
          </nav>
          <Typography className={classes.name}>Hello Hisham</Typography>
          {/* <Avatar>H</Avatar> */}
          <FadeMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminHeader;

