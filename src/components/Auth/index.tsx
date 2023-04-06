import React, { type FC } from "react";
import style from "./auth.module.css";
import { Modal, Paper } from "@mui/material";
import HeaderWithClose from "../common/HeaderWithClose";
import Login from "./form/Login";

interface Props {
    isOpened: boolean;
    close: () => void;
}

const Auth: FC<Props> = ({ close, isOpened }) => {
    return (
        <Modal open={isOpened} onClose={close} keepMounted>
            <Paper className={style.auth}>
                <HeaderWithClose title="Authorize" close={close} />
                <Login />
            </Paper>
        </Modal>
    );
};

export default Auth;
