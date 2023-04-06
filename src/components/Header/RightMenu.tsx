import { Box, Link as MaterialLink } from "@mui/material";
import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { setIsSearchActive } from "../../store/slices/searchSlice";
import Cart from "../Cart";

const RightMenu = () => {
    const isSearchActive = useTypedSelector((state) => state.searchSlice.isSearchActive);
    const { cartItemsCount } = useTypedSelector((state) => state.cartSlice);
    const dispatch = useTypedDispatch();
    const handleSearchClick = () => dispatch(setIsSearchActive(!isSearchActive));

    const [cartIsOpened, setIsCartOpened] = React.useState(false);
    const openCart = () => {
        setIsCartOpened(true);
    };
    const closeCart = () => {
        setIsCartOpened(false);
    };
    return (
        <Box sx={{ display: { xs: "none", md: "flex" }, px: 2, flex: 1, justifyContent: "right" }}>
            <MaterialLink
                underline="none"
                sx={{ fontWeight: isSearchActive ? "700" : "400" }}
                className="link"
                onClick={handleSearchClick}
            >
                Search
            </MaterialLink>
            <MaterialLink className="link">Account </MaterialLink>
            <MaterialLink underline="none" className="link" onClick={openCart}>
                Cart({cartItemsCount})
            </MaterialLink>
            <Cart close={closeCart} isOpened={cartIsOpened} />
        </Box>
    );
};

export default RightMenu;
