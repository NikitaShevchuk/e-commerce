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
    const linkWeight = React.useMemo(
        () => isSearchActive ? '700' : '400',
        [isSearchActive]
    )
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}, px: 2, flex: 1, justifyContent: 'right'}}>
            <Link
                underline="none"
                sx={{fontWeight: linkWeight}}
                className='link'
                onClick={handleSearchClick}
            >
                Search
            </Link>
            <NavLink
                className='link'
                to='/account'
            >
                Account
            </NavLink>
            <Link
                underline="none"
                className='link'
                onClick={handleCartClick}
            >
                Cart({cartItemsCount})
            </Link>
        </Box>
    );
};

export default RightMenu;