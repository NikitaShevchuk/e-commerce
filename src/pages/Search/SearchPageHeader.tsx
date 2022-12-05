import React from 'react';
import {Container, Typography} from "@mui/material";
import ProductsSearch from "../../components/Header/Search/ProductsSearch";
import {useTypedSelector} from "../../hooks/redux";

const SearchPageHeader = () => {
    const searchRequest = useTypedSelector( state => state.searchSlice.searchRequestText )
    const itemsCount = useTypedSelector(state => state.filterSlice.itemsCount)
    return (
        <Container maxWidth='md' sx={{py: 6}} >
            <Typography sx={{pb: 4}}>
                {`${itemsCount} `}
                results for "{searchRequest}"
            </Typography>
            <ProductsSearch />
        </Container>
    );
};

export default SearchPageHeader;