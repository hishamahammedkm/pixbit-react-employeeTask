import { Checkbox, FormControlLabel } from "@material-ui/core"
import { useField, useFormikContext } from "formik";
import { useState } from "react";

const AddressCheckBox = () => {
    const [field] = useField({ name: "addressCheckBox", type: "checkbox" });
    const { setFieldValue, values } = useFormikContext();
    const [checkBoxAddress, setCheckBoxAddress] = useState(false);
    const checkBoxAddressChange = () => {


        setFieldValue('addressCheckBox', !values.addressCheckBox)

        if (!values.addressCheckBox) {
            const address = values.present_address
            setFieldValue("permanent_address", address)
        }

    };
    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        {...field}
                        onChange={checkBoxAddressChange}
                        checked={values.addressCheckBox}
                        color="primary"
                    />
                }
                label="Same as Present Address"
            />
        </div>
    )
}

export default AddressCheckBox
