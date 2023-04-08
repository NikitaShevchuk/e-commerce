import { Person2Outlined, ArrowBackIosNewOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTypedDispatch } from "@/hooks/redux";
import { type SignUpData } from "@/services/profile";
import { loginThunk } from "@/store/slices/profile/thunks";
import { resolver } from "./validation";
import PasswordField from "../PasswordField";
import EmailField from "../EmailField";
import NameField from "./NameField";

interface Props {
    goToLogin: () => void;
}

const SignUp: FC<Props> = ({ goToLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpData>({ mode: "onTouched", resolver });
    const dispatch = useTypedDispatch();

    const onSubmit: SubmitHandler<SignUpData> = (formData) => {
        void dispatch(loginThunk(formData));
        goToLogin();
    };
    return (
        <form className="opacity" onSubmit={handleSubmit(onSubmit)}>
            <NameField inputProps={register("name")} fieldError={errors.name} />

            <EmailField inputProps={register("email")} fieldError={errors.email} />

            <PasswordField inputProps={register("password")} fieldError={errors.password} />

            <PasswordField
                inputProps={register("confirmPassword")}
                overwriteLabel="Confirm password"
                fieldError={errors.password}
            />

            <Button
                variant="outlined"
                sx={{ mt: 3, mr: 2 }}
                type="submit"
                onClick={goToLogin}
                startIcon={<ArrowBackIosNewOutlined />}
            >
                Back to login
            </Button>

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                type="submit"
                startIcon={<Person2Outlined />}
            >
                Register account
            </Button>
        </form>
    );
};

export default SignUp;
