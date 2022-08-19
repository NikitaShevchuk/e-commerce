import React from 'react';
import {Box, Link} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {setIsSearchActive} from "../../store/slices/searchSlice";

const RightMenu = () => {
    const isSearchActive = useTypedSelector(state => state.searchSlice.isSearchActive)
    const dispatch = useTypedDispatch()
    const handleClick = () => dispatch(setIsSearchActive(!isSearchActive))
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}, px: 2, flex: 1, justifyContent: 'right'}}>
            <Link
                underline="none"
                sx={{
                    mx: 2,
                    fontWeight: `${isSearchActive ? '700' : '400'}`,
                    cursor: 'pointer'
                }}
                onClick={handleClick}
            >
                Search
            </Link>
            <NavLink style={{margin: '0px 15px'}} className='link' to='/account'>Account</NavLink>
            <NavLink style={{margin: '0px 15px'}} className='link' to='/cart'>Cart(0)</NavLink>
        </Box>
    );
};

export default RightMenu;