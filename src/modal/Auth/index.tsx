import React, { type FC } from "react";
import style from "./auth.module.css";
import { Modal, Paper, Typography } from "@mui/material";
import HeaderWithClose from "@/components/common/HeaderWithClose";
import Login from "@/forms/login/";
import { useTypedSelector } from "@/hooks/redux";
import { getIsAuthorized, getIsLoading, getLoginError } from "@/store/selectors/profile";
import UserProfile from "@/features/Profile";
import Spinner from "@/components/Loaders/Spinner";
import { useAuthorize } from "./hooks/useAuthorize";
import { Error } from "@mui/icons-material";

interface Props {
    isOpened: boolean;
    close: () => void;
}

const Auth: FC<Props> = ({ close, isOpened }) => {
    const isAuthorized = useTypedSelector(getIsAuthorized);
    const isLoading = useTypedSelector(getIsLoading);
    const error = useTypedSelector(getLoginError);
    useAuthorize();
    return (
        <Modal open={isOpened} onClose={close} keepMounted>
            <Paper className={style.auth}>
                <HeaderWithClose
                    title={isAuthorized ? "Your profile" : "Authorize"}
                    close={close}
                />

                {isAuthorized ? <UserProfile /> : isLoading ? <Spinner fill /> : <Login />}

                {error !== null ? (
                    <Typography className={style.error}>
                        <Error />
                        {error}
                    </Typography>
                ) : null}
            </Paper>
        </Modal>
    );
};

export default Auth;
