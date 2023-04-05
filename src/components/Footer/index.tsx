import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { type FC } from "react";
import style from "./footer.module.css";

const Footer: FC = () => {
    return (
        <AppBar position="static">
            <Toolbar disableGutters className={style.footer__toolbar}>
                <Typography
                    color="black"
                    component="div"
                    variant="caption"
                    sx={{ textAlign: "center" }}
                >
                    shevchuk.nikita.gh@gmail.com
                </Typography>
                <Typography
                    color="black"
                    component="div"
                    variant="caption"
                    sx={{ textAlign: "center" }}
                >
                    2023 All rights reserved
                </Typography>
                <Typography
                    color="black"
                    component="div"
                    variant="caption"
                    sx={{ textAlign: "center" }}
                >
                    +1111111111
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
