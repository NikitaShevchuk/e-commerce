import { Login as LoginIcon } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import style from "./login.module.css";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                placeholder="Email"
                className={style.field}
                variant="standard"
                InputLabelProps={{ sx: { color: "#181818" } }}
                label="Email"
                inputProps={register("email")}
            />
            <TextField
                placeholder="Password"
                className={style.field}
                InputLabelProps={{ sx: { color: "#181818" } }}
                variant="standard"
                label="Password"
                inputProps={register("password")}
                type="password"
            />
            <Button variant="outlined" sx={{ mt: 3 }} type="submit" startIcon={<LoginIcon />}>
                Submit
            </Button>
        </form>
    );
};

export default Login;
