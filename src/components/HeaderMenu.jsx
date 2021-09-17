import React,{ useState} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Avatar, makeStyles } from "@material-ui/core";
// import { logout } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";



const useStyles = makeStyles((theme) => ({

  name: {

    display: "none",

    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },


}));



export default function FadeMenu() {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // dispatch(logout());
    localStorage.removeItem('token')
    history.push("/login");
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className={classes.name} style={{ marginRight: 10, fontWeight: 600 }}>Hisham</span>
        <Avatar>H</Avatar>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
