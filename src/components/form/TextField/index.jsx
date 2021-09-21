import React from "react";
import { TextField } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const { values,setFieldValue} = useFormikContext();

  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if(name === "present_address"){
    configTextfield.onChange = (e)=>{
      setFieldValue('addressCheckBox',false);

      setFieldValue('present_address',e.target.value)
    }
  }
  if(name === "permanent_address"){
    configTextfield.onChange = (e)=>{
      setFieldValue('addressCheckBox',false);

      setFieldValue('permanent_address',e.target.value)
    }
  }
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;