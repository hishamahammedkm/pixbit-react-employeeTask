import { useField, useFormikContext } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const DatePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    // console.log('eeeeeee',e);
    setFieldValue(name, e);
  };

  const configDatePicker = {
    ...field,
    ...otherProps,
    variant: "inline",
    inputVariant: "outlined",
    onChange:handleChange,
    // required: true,
   
    fullWidth: true,
    // format: "MM/dd/yyyy",
    format: "yyy/MM/dd",
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
