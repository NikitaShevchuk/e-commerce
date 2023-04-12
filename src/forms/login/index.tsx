import { Login as LoginIcon } from "@mui/icons-material";
import { Button, Link } from "@mui/material";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTypedDispatch } from "@/hooks/redux";
import { type LoginData } from "@/services/profile";
import { loginThunk } from "@/store/slices/profile/thunks";
import { resolver } from "./validation";
import PasswordField from "../PasswordField";
import EmailField from "../EmailField";
import SignUp from "../signup";

export type FormType = "login" | "register";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginData>({ mode: "onTouched", resolver });
    const dispatch = useTypedDispatch();

    const [formType, setFormType] = React.useState<FormType>("login");

    const onSubmit: SubmitHandler<LoginData> = (formData) => {
        void dispatch(loginThunk(formData));
    };

    const goToRegistration = () => {
        setFormType("register");
    };

    const goToLogin = () => {
        setFormType("login");
    };

    if (formType === "register") return <SignUp goToLogin={goToLogin} />;

    return (
        <form className="opacity" onSubmit={handleSubmit(onSubmit)}>
            <EmailField inputProps={register("email")} fieldError={errors.email} />
            <PasswordField inputProps={register("password")} fieldError={errors.password} />
            <Button
                variant="outlined"
                sx={{ mt: 3, mb: 3 }}
                type="submit"
                startIcon={<LoginIcon />}
            >
                Login
            </Button>
            <br />
            <Link sx={{ cursor: "pointer" }} onClick={goToRegistration}>
                Register a new account.
            </Link>
        </form>
    );
};

export default Login;
