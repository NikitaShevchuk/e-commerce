import React, { FC } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LeftMenu from "./LeftMenu";
import { StorefrontOutlined } from "@mui/icons-material";
import RightMenu from "./RightMenu";
import { NavLink } from "react-router-dom";
import HeaderSearch from "./Search";
import Cart from "../Cart";

const Header: FC = () => {
    return (
        <AppBar position="sticky" color="transparent" sx={{ boxShadow: 0 }}>
            <Toolbar disableGutters className="toolbar">
                <LeftMenu />
                <Typography sx={{ flex: 1 }}>
                    <NavLink to="/" className="home-link">
                        <StorefrontOutlined sx={{ mr: 1, fontSize: 20 }} />
                        E-commerce
                    </NavLink>
                </Typography>
                <RightMenu />
            </Toolbar>
            <HeaderSearch />
            <Cart />
        </AppBar>
    );
};

export default Header;
