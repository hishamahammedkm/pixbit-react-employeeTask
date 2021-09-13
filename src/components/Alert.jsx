import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { tr } from "date-fns/locale";
import { useDispatch } from "react-redux";
// import { setStatus } from "../store/slices/employeeSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(4),
    },
    marginTop: "50px",
  },
}));

export default function ActionAlerts() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const classes = useStyles();
  const handleClick = () => {
    // dispatch(setStatus(false));
  };

  return (
    <>
      {isOpen && (
        <div className={classes.root}>
          {/* <Alert onClose={() => {}}>
            This is a success alert — check it out!
          </Alert> */}
          <Alert
            action={
              <Button color="inherit" size="small" onClick={handleClick}>
                <CloseOutlinedIcon />
              </Button>
            }
          >
            Successfully created
          </Alert>
        </div>
      )}
    </>
  );
}
