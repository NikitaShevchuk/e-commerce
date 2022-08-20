import React, {FC} from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import LeftMenu from "./LeftMenu";
import {StorefrontOutlined} from "@mui/icons-material";
import RightMenu from "./RightMenu";
import {NavLink} from "react-router-dom";
import HeaderSearch from "./Search";

const Header: FC = () => {
    return (
        <AppBar position='sticky' color='transparent' sx={{boxShadow: 0}}>
            <Toolbar
                disableGutters
                sx={{
                    display: {xs: 'flex'},
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}
            >
                <LeftMenu />
                <Typography sx={{flex: 1}}>
                    <NavLink
                        to='/'
                        style={{
                            fontSize: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <StorefrontOutlined sx={{mr: 1, fontSize: 20}} />
                        E-commerce
                    </NavLink>
                </Typography>
                <RightMenu />
            </Toolbar>
            <HeaderSearch />
        </AppBar>
    );
};

export default Header;