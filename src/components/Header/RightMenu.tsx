import React from 'react';
import {Box, Link} from "@mui/material";
import {NavLink} from "react-router-dom";

const RightMenu = () => {
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}, px: 2, flex: 1, justifyContent: 'right'}}>
            <Link
                underline="none"
                sx={{ mx: 2, display: 'block', cursor: 'pointer'}}
            >
                Search
            </Link>
            <NavLink style={{margin: '0px 15px'}} className='link' to='/account'>Account</NavLink>
            <NavLink style={{margin: '0px 15px'}} className='link' to='/cart'>Cart(0)</NavLink>
        </Box>
    );
};

export default RightMenu;