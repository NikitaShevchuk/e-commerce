import React from 'react';
import {Container, Paper, Stack, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import {useTypedDispatch, useTypedSelector} from "../../../hooks/redux";
import {setIsSearchActive} from "../../../store/slices/searchSlice";
import {getSearchSlice} from "../../../store/selectors/search";
import {useGetProductsBySearchQuery} from "../../../services/productsService";
import SearchResultProduct from "./SearchResultProduct";
import SearchResultPreloader from "../../Loaders/SearchResultPreloader";
import BasicPreloader from "../../Loaders/BasicPreloader";
import SearchField from "./SearchField";

const HeaderSearch = () => {
    const {isSearchActive, searchRequest} = useTypedSelector(getSearchSlice)
    let [skip, setSkip] = React.useState(false)
    React.useEffect(
        () => {setSkip(!searchRequest)}, // skip the request if search field is empty
        [searchRequest]
    )
    const {
        data: products, isLoading, isError, isFetching
    } = useGetProductsBySearchQuery(searchRequest, {skip})
    const dispatch = useTypedDispatch()
    const handleClick = () => dispatch(setIsSearchActive(false))
    let searchBlockClassName = isSearchActive ? 'search-block active' : 'search-block'
    return (
        <Paper className={searchBlockClassName} >
            <Paper sx={{backgroundColor: 'secondary', py: 6}} >
                <Container maxWidth='md'>
                    <Stack
                        justifyContent='space-between'
                        direction='row'
                    >
                        <Typography>
                            What are you looking for?
                        </Typography>
                        <CloseIcon
                            sx={{cursor: 'pointer', mb: 5}}
                            onClick={handleClick}
                        />
                    </Stack>
                    <SearchField />
                    <BasicPreloader
                        isLoading={isLoading}
                        isFetching={isFetching}
                        itemsToShow={2}
                    >
                        <SearchResultPreloader />
                    </BasicPreloader>
                    {!isFetching && products && products.map( product =>
                        <SearchResultProduct
                            key={product.id}
                            productName={product.name}
                            productColor={product.color}
                            productId={product.id}
                        />
                    )}
                    {isError &&
                        // todo add error component
                        'Error component'
                    }
                </Container>
            </Paper>
        </Paper>
    );
};

export default HeaderSearch