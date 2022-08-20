import React from 'react';
import {Container, Typography} from "@mui/material";
import SearchField from "../../components/Header/Search/SearchField";
import {useTypedSelector} from "../../hooks/redux";

const SearchPageHeader = () => {
    const searchRequest = useTypedSelector( state => state.searchSlice.searchRequest )
    const itemsCount = useTypedSelector(state => state.filterSlice.itemsCount)
    return (
        <Container maxWidth='md' sx={{py: 6}} >
            <Typography sx={{pb: 4}}>
                {`${itemsCount} `}
                results for "{searchRequest}"
            </Typography>
            <SearchField />
        </Container>
    );
};

export default SearchPageHeader;