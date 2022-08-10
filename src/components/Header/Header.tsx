import React, {FC} from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import LeftMenu from "./LeftMenu";
import {StorefrontOutlined} from "@mui/icons-material";
import RightMenu from "./RightMenu";
import {NavLink} from "react-router-dom";

const Header: FC = () => {
    return (
        <AppBar position='sticky' color='secondary' sx={{boxShadow: 0}}>
            <Toolbar disableGutters sx={{display: {xs: 'flex'}, justifyContent: 'center'}}>
                <LeftMenu />
                <Typography sx={{flex: 1}}>
                    <NavLink to='/' style={{fontSize: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                        <StorefrontOutlined sx={{mr: 1, fontSize: 20}} />
                        E-commerce
                    </NavLink>
                </Typography>
                <RightMenu />
            </Toolbar>
        </AppBar>
    );
};

export default Header;