import { useField, useFormikContext } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const DatePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configDatePicker = {
    ...field,
    ...otherProps,
    variant: "inline",
    inputVariant: "outlined",
    onChange: (evt) => handleChange(evt),
    // required: true,
    margin: "normal",
    fullWidth: true,
    format: "MM/dd/yyyy",
    KeyboardButtonProps: {
      "aria-label": "change date",
    },
  };

  if (meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker {...configDatePicker} />
    </MuiPickersUtilsProvider>
  );
};
export default DatePicker;
