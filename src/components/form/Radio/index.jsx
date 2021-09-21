import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
const RadioForm = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configRadio = {
    ...field,
    ...otherProps,
    // select: true,
    // variant: "outlined",
    // fullWidth: true,
    onChange: handleChange,
  };
  if (meta && meta.touched && meta.error) {
    configRadio.error = true;
    configRadio.helperText = meta.error;
  }

  return (
    <div>
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup {...configRadio}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
        </RadioGroup>
      </FormControl>
      <span style={{ color: "red" }}>
        {meta.error && "Required"}
      </span>
    </div>
  );
};

export default RadioForm;
