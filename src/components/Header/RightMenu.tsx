import React from 'react';
import {Box, Link} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {setIsSearchActive} from "../../store/slices/searchSlice";
import {setIsCartModalOpened} from "../../store/slices/cartSlice";

const RightMenu = () => {
    const isSearchActive = useTypedSelector(state => state.searchSlice.isSearchActive)
    const {isCartModalOpened, cartItemsCount} = useTypedSelector(state => state.cartSlice)
    const dispatch = useTypedDispatch()
    const handleSearchClick = () => dispatch(setIsSearchActive(!isSearchActive))
    const handleCartClick = () => dispatch(setIsCartModalOpened(!isCartModalOpened))
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}, px: 2, flex: 1, justifyContent: 'right'}}>
            <Link
                underline="none"
                sx={{
                    mx: 2,
                    fontWeight: `${isSearchActive ? '700' : '400'}`,
                    cursor: 'pointer'
                }}
                onClick={handleSearchClick}
            >
                Search
            </Link>
            <NavLink
                style={{margin: '0px 15px'}}
                className='link' to='/account'
            >
                Account
            </NavLink>
            <Link
                sx={{margin: '0px 15px', cursor: 'pointer'}}
                underline="none"
                onClick={handleCartClick}
            >
                Cart({cartItemsCount})
            </Link>
        </Box>
    );
};

export default RightMenu;