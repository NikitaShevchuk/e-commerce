import {
    Login as LoginIcon,
    RemoveRedEyeOutlined as ShowEye,
    RemoveRedEye as HideEye
} from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import style from "./login.module.css";
import { useTypedDispatch } from "@/hooks/redux";
import { type LoginData } from "@/services/profile";
import { loginThunk } from "@/store/slices/profile/thunks";
import { resolver } from "./validation";

const labelProps = { sx: { color: "#181818" } };

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginData>({ mode: "onTouched", resolver });
    const dispatch = useTypedDispatch();

    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<LoginData> = (formData) => {
        void dispatch(loginThunk(formData));
    };
    const PasswordInputProps = {
        endAdornment: showPassword ? (
            <HideEye sx={{ cursor: "pointer" }} onClick={toggleShowPassword} />
        ) : (
            <ShowEye sx={{ cursor: "pointer" }} onClick={toggleShowPassword} />
        )
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                placeholder="Email"
                className={style.field}
                variant="standard"
                InputLabelProps={labelProps}
                label="Email"
                inputProps={register("email")}
                helperText={errors.email?.message}
                error={errors.email !== undefined}
            />
            <TextField
                placeholder="Password"
                className={style.field}
                InputLabelProps={labelProps}
                variant="standard"
                label="Password"
                inputProps={register("password")}
                InputProps={PasswordInputProps}
                type={showPassword ? "text" : "password"}
                helperText={errors.password?.message}
                error={errors.password !== undefined}
            />
            <Button variant="outlined" sx={{ mt: 3 }} type="submit" startIcon={<LoginIcon />}>
                Login
            </Button>
        </form>
    );
};

export default Login;
