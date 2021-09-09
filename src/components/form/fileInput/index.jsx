import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useField, useFormikContext } from "formik";
import { useRef } from "react";
const FileInput = ({ name, ...otherProps }) => {
  const fileInputEl = useRef(null);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (evt) => {
    // const { value } = evt.target;
    setFieldValue(name, evt.target.files[0]);
  };

  const configFile = {
    ...field,
    ...otherProps,
    // required: true,

    fullWidth: true,
    onChange: handleChange,
  };
  if (meta && meta.touched && meta.error) {
    configFile.error = true;
    configFile.helperText = meta.error;
  }

  return (
    <div>
      <TextField
        {...configFile}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  fileInputEl.current.click();
                }}
                edge="end"
              >
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />

      <input
        // required
        // label={label}
        name={name}
        ref={fileInputEl}
        type="file"
        style={{ width: "0", height: "0" }}
        onChange={handleChange}
        hidden
      />
    </div>
  );
};

export default FileInput;
