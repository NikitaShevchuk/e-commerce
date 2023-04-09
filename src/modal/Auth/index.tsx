import React, { type FC } from "react";
import style from "./auth.module.css";
import { Modal, Paper, Typography } from "@mui/material";
import HeaderWithClose from "@/components/common/HeaderWithClose";
import Login from "@/forms/login/";
import { useTypedSelector } from "@/hooks/redux";
import {
    getInfoMessage,
    getIsAuthorized,
    getIsAuthorizing,
    getLoginError
} from "@/store/selectors/profile";
import UserProfile from "@/features/Profile";
import Spinner from "@/components/Loaders/Spinner";
import { useAuthorize } from "./hooks/useAuthorize";
import { Error, CheckCircleOutlined } from "@mui/icons-material";

interface Props {
    isOpened: boolean;
    close: () => void;
}

const Auth: FC<Props> = ({ close, isOpened }) => {
    const isAuthorized = useTypedSelector(getIsAuthorized);
    const isAuthorizing = useTypedSelector(getIsAuthorizing);
    const error = useTypedSelector(getLoginError);
    const infoMessage = useTypedSelector(getInfoMessage);
    useAuthorize();
    return (
        <Modal open={isOpened} onClose={close} keepMounted>
            <Paper className={style.auth}>
                <HeaderWithClose
                    title={isAuthorized ? "Your profile" : "Authorize"}
                    close={close}
                />

                {isAuthorized ? <UserProfile /> : isAuthorizing ? <Spinner fill /> : <Login />}

                {infoMessage !== null ? (
                    <Typography color="success.main" className={style.message}>
                        <CheckCircleOutlined />
                        {infoMessage}
                    </Typography>
                ) : null}
                {error !== null ? (
                    <Typography color="error.main" className={style.message}>
                        <Error />
                        {error}
                    </Typography>
                ) : null}
            </Paper>
        </Modal>
    );
};

export default Auth;
