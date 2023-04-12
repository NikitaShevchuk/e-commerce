import { TextField } from "@mui/material";
import React, { type FC } from "react";
import { labelProps } from "../PasswordField";
import style from "../form.module.css";
import { type FieldProps } from "../Types";

const NameField: FC<FieldProps> = ({ fieldError, inputProps }) => {
    return (
        <TextField
            placeholder="Name"
            className={style.field}
            variant="standard"
            InputLabelProps={labelProps}
            label="Name"
            inputProps={inputProps}
            helperText={fieldError?.message}
            error={fieldError !== undefined}
        />
    );
};

export default NameField;
