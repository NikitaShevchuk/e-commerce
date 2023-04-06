import { StorefrontOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React, { type FC } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import HeaderSearch from "./Search";

const Header: FC = () => {
    return (
        <AppBar position="sticky" color="transparent" sx={{ boxShadow: 0 }}>
            <Toolbar disableGutters className="toolbar">
                <LeftMenu />
                <Typography sx={{ flex: 1 }}>
                    <Link replace href="/" className="home-link">
                        <StorefrontOutlined sx={{ mr: 1, fontSize: 20 }} />
                        E-commerce
                    </Link>
                </Typography>
                <RightMenu />
            </Toolbar>
            <HeaderSearch />
        </AppBar>
    );
};

export default Header;
