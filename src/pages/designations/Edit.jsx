import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import { editDesignation } from '../store/slices/employeeSlice';
import { useDispatch } from "react-redux";
import {
  useGetDesignationsQuery,
  useUpdateDesignationMutation,
} from "../../redux/services/employee";

export default function FormDialog({ item, isOpen }) {
  const [updateDesignation] = useUpdateDesignationMutation();
  const des = useGetDesignationsQuery();
  const dispatch = useDispatch();
  const [designation_name, setDesignation_name] = useState(item.name);
  const [open, setOpen] = useState(isOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    updateDesignation({ id: item.id, designation_name }).then((res) => {});

    // dispatch(editDesignation({id:item.id,designation_name}))
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Enter new designation name{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designation Name"
            type="email"
            fullWidth
            value={designation_name}
            onChange={(e) => setDesignation_name(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
