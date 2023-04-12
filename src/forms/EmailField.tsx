import { TextField } from "@mui/material";
import React, { type FC } from "react";
import { labelProps } from "./PasswordField";
import style from "./form.module.css";
import { type FieldProps } from "./Types";

const EmailField: FC<FieldProps> = ({ fieldError, inputProps }) => {
    return (
        <TextField
            placeholder="mail@mail.com"
            className={style.field}
            variant="standard"
            InputLabelProps={labelProps}
            label="Email"
            inputProps={inputProps}
            helperText={fieldError?.message}
            error={fieldError !== undefined}
        />
    );
};

export default EmailField;
