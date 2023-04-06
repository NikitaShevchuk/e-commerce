import React from "react";
import { Link as MaterialLink } from "@mui/material";
import Auth from "@/components/Auth";

const AuthLink = () => {
    const [isOpened, setIsOpened] = React.useState(false);
    const open = () => {
        setIsOpened(true);
    };
    const close = () => {
        setIsOpened(false);
    };
    return (
        <>
            <MaterialLink onClick={open} className="link">
                Account
            </MaterialLink>
            <Auth close={close} isOpened={isOpened} />
        </>
    );
};

export default AuthLink;
