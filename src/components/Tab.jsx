import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link, useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import FadeMenu from "./HeaderMenu";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
    display: "flex",
    justifyContent: "spaceBetween",
    // width: 1050,
    flex: 1,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  title: {
    marginLeft: "30px",
    marginRight: "20PX",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
  user: {
    position: "absolute",
    right: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
}));

export default function FullWidthTabs({ tab }) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(tab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ position: "fixed", top: 0 }}
        className={classes.main}
        position="static"
        color="default"
      >
        <Link className={classes.link} to="/">
          <Typography className={classes.title} variant="h6">
            Admin Templates{" "}
          </Typography>
        </Link>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab
            // onClick={() => {
            //   history.push("/");
            // }}
            component={Link}
            to="/"
            label="Home"
            {...a11yProps(0)}
          />

          <Tab
            // onClick={() => {
            //   history.push("/employees");
            // }}
            component={Link}
            to="/employees"
            label="Employees"
            {...a11yProps(0)}
          />

          <Tab
            // onClick={() => {
            //   //  handleChange()
            //   history.push("/designations");
            // }}
            component={Link}
            to="/designations"
            label="Designations"
            {...a11yProps(0)}
          />

          {/* </Link> */}
          {/* <Tab label="Designations" {...a11yProps(1)} /> */}
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
        <div className={classes.user}>
          {/* <span>Hello Hisham</span> */}
          <FadeMenu />
        </div>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}></TabPanel>
      </SwipeableViews>
    </div>
  );
}
