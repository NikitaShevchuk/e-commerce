import { Container, Paper } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { getSearchSlice } from "../../../store/selectors/search";
import { setIsSearchActive } from "../../../store/slices/searchSlice";
import HeaderWithClose from "../../common/HeaderWithClose";
import ProductsSearch from "./ProductsSearch";
import SearchResults from "./SearchResults";

const HeaderSearch = () => {
    const { isSearchActive } = useTypedSelector(getSearchSlice);
    const searchBlockClassName = isSearchActive ? "search-block active" : "search-block";
    return (
        <Paper className={searchBlockClassName}>
            <Paper sx={{ backgroundColor: "secondary", py: 6 }}>
                <Container maxWidth="md">
                    <HeaderWithClose
                        title="What are you looking for?"
                        handleClose={setIsSearchActive}
                    />
                    <ProductsSearch />
                    <SearchResults />
                </Container>
            </Paper>
        </Paper>
    );
};

export default HeaderSearch;
