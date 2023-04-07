import React, { type FC } from "react";
import style from "./auth.module.css";
import { Modal, Paper } from "@mui/material";
import HeaderWithClose from "@/components/common/HeaderWithClose";
import Login from "@/forms/login/";
import { useTypedSelector } from "@/hooks/redux";
import { getIsAuthorized, getIsLoading } from "@/store/selectors/profile";
import UserProfile from "@/features/Profile";

interface Props {
    isOpened: boolean;
    close: () => void;
}

const Auth: FC<Props> = ({ close, isOpened }) => {
    const isAuthorized = useTypedSelector(getIsAuthorized);
    const isLoading = useTypedSelector(getIsLoading);
    return (
        <Modal open={isOpened} onClose={close} keepMounted>
            <Paper className={style.auth}>
                <HeaderWithClose
                    title={isAuthorized ? "Your profile" : "Authorize"}
                    close={close}
                />
                {isAuthorized ? <UserProfile /> : isLoading ? "Loading" : <Login />}
            </Paper>
        </Modal>
    );
};

export default Auth;
