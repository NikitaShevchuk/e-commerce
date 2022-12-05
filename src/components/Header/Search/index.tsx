import React from 'react';
import {Container, Paper} from "@mui/material";
import {useTypedSelector} from "../../../hooks/redux";
import {setIsSearchActive} from "../../../store/slices/searchSlice";
import {getSearchSlice} from "../../../store/selectors/search";
import ProductsSearch from "./ProductsSearch";
import HeaderWithClose from "../../common/HeaderWithClose";
import SearchResults from "./SearchResults";

const HeaderSearch = () => {
    const {isSearchActive} = useTypedSelector(getSearchSlice)
    const searchBlockClassName = isSearchActive ? 'search-block active' : 'search-block'
    return (
        <Paper className={searchBlockClassName} >
            <Paper sx={{backgroundColor: 'secondary', py: 6}} >
                <Container maxWidth='md'>
                    <HeaderWithClose
                        title='What are you looking for?'
                        handleClose={setIsSearchActive}
                    />
                    <ProductsSearch />
                    <SearchResults />
                </Container>
            </Paper>
        </Paper>
    );
};

export default HeaderSearch