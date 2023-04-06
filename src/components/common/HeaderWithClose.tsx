import React, { type FC } from "react";
import { Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTypedDispatch } from "../../hooks/redux";
import { type ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
    title: string;
    handleClose?: ActionCreatorWithPayload<any, any>;
    close?: () => void;
}

const HeaderWithClose: FC<Props> = ({ title, handleClose, close }) => {
    const dispatch = useTypedDispatch();
    const handleClick = () => {
        if (handleClose !== undefined) dispatch(handleClose(false));
        if (close !== undefined) close();
    };
    return (
        <Stack justifyContent="space-between" direction="row">
            <Typography>{title}</Typography>
            <CloseIcon sx={{ cursor: "pointer", mb: 5 }} onClick={handleClick} />
        </Stack>
    );
};

export default HeaderWithClose;
