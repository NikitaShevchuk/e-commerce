import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";

const LeftMenu = () => {
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}, px: 2, flex: 1}}>
            <NavLink className='link' to='/categories/men'>Men</NavLink>
            <NavLink className='link' to='/categories/women'>Women</NavLink>
            <NavLink className='link' to='/categories/sales'>Sales</NavLink>
        </Box>
    );
};

export default LeftMenu;