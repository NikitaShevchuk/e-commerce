import { Box, Link as MaterialLink } from "@mui/material";
import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { setIsSearchActive } from "../../../store/slices/searchSlice";
import CartLink from "./CartLink";
import AuthLink from "./AuthLink";

const menuStyles = { display: { xs: "none", md: "flex" }, px: 2, flex: 1, justifyContent: "right" };

const RightMenu = () => {
    const isSearchActive = useTypedSelector((state) => state.searchSlice.isSearchActive);
    const dispatch = useTypedDispatch();
    const handleSearchClick = () => dispatch(setIsSearchActive(!isSearchActive));
    return (
        <Box sx={menuStyles}>
            <MaterialLink
                underline="none"
                sx={{ fontWeight: isSearchActive ? "700" : "400" }}
                className="link"
                onClick={handleSearchClick}
            >
                Search
            </MaterialLink>
            <AuthLink />
            <CartLink />
        </Box>
    );
};

export default RightMenu;
