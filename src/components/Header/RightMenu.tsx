import { Box, Link as MaterialLink } from "@mui/material";
import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { setIsCartModalOpened } from "../../store/slices/cartSlice";
import { setIsSearchActive } from "../../store/slices/searchSlice";

const RightMenu = () => {
    const isSearchActive = useTypedSelector((state) => state.searchSlice.isSearchActive);
    const { isCartModalOpened, cartItemsCount } = useTypedSelector((state) => state.cartSlice);
    const dispatch = useTypedDispatch();
    const handleSearchClick = () => dispatch(setIsSearchActive(!isSearchActive));
    const handleCartClick = () => dispatch(setIsCartModalOpened(!isCartModalOpened));
    const linkWeight = React.useMemo(() => (isSearchActive ? "700" : "400"), [isSearchActive]);
    return (
        <Box sx={{ display: { xs: "none", md: "flex" }, px: 2, flex: 1, justifyContent: "right" }}>
            <MaterialLink
                underline="none"
                sx={{ fontWeight: linkWeight }}
                className="link"
                onClick={handleSearchClick}
            >
                Search
            </MaterialLink>
            <MaterialLink className="link">Account </MaterialLink>
            <MaterialLink underline="none" className="link" onClick={handleCartClick}>
                Cart({cartItemsCount})
            </MaterialLink>
        </Box>
    );
};

export default RightMenu;
