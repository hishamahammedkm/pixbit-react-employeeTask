import React from "react";
import { TextField } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const TextfieldWrapper = ({ name, isChecked, ...otherProps }) => {
  const { values, submitForm } = useFormikContext();

  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }
  if (isChecked) {
    configTextfield.value = values.present_address;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
