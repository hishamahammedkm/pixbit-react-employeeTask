import { Checkbox, FormControlLabel } from "@material-ui/core"
import { useFormikContext } from "formik";
import { useState } from "react";

const AddressCheckBox = () => {

    const { setFieldValue, values } = useFormikContext();
    const [checkBoxAddress, setCheckBoxAddress] = useState(false);
    const checkBoxAddressChange = (e) => {
        setCheckBoxAddress(!checkBoxAddress)
        const address = values.present_address
        setFieldValue("permanent_address", address)
    };
    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checkBoxAddress}
                        onChange={checkBoxAddressChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Same as present Address"
            />
        </div>
    )
}

export default AddressCheckBox
