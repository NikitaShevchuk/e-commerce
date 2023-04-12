import { TextField } from "@mui/material";
import React, { type FC } from "react";
import style from "./form.module.css";
import { RemoveRedEyeOutlined as ShowEye, RemoveRedEye as HideEye } from "@mui/icons-material";
import { type FieldProps } from "./Types";

export const labelProps = { sx: { color: "#181818" } };

const PasswordField: FC<FieldProps> = ({ fieldError, inputProps, overwriteLabel }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const PasswordInputProps = {
        endAdornment: showPassword ? (
            <HideEye sx={{ cursor: "pointer" }} onClick={toggleShowPassword} />
        ) : (
            <ShowEye sx={{ cursor: "pointer" }} onClick={toggleShowPassword} />
        )
    };
    return (
        <TextField
            placeholder="12345678"
            className={style.field}
            InputLabelProps={labelProps}
            variant="standard"
            label={overwriteLabel ?? "Password"}
            inputProps={inputProps}
            InputProps={PasswordInputProps}
            type={showPassword ? "text" : "password"}
            helperText={fieldError?.message}
            error={fieldError !== undefined}
        />
    );
};

export default PasswordField;
