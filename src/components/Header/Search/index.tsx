import React from 'react';
import {Container, Paper, Typography} from "@mui/material";
import {useTypedSelector} from "../../../hooks/redux";
import {setIsSearchActive} from "../../../store/slices/searchSlice";
import {getSearchSlice} from "../../../store/selectors/search";
import {useGetProductsBySearchQuery} from "../../../services/productsService";
import SearchResultProduct from "./SearchResultProduct";
import SearchResultPreloader from "../../Loaders/SearchResultPreloader";
import BasicPreloader from "../../Loaders/BasicPreloader";
import SearchField from "./SearchField";
import LoadingError from "../../LoadingError";
import HeaderWithClose from "../../common/HeaderWithClose";

const HeaderSearch = () => {
    const {isSearchActive, searchRequest} = useTypedSelector(getSearchSlice)
    let [skip, setSkip] = React.useState(false)
    React.useEffect(
        () => {setSkip(!searchRequest)}, // skip the request if search field is empty
        [searchRequest]
    )
    const {
        data: products, isLoading, isError, isFetching, refetch
    } = useGetProductsBySearchQuery(searchRequest, {skip})

    let searchBlockClassName = isSearchActive ? 'search-block active' : 'search-block'
    return (
        <Paper className={searchBlockClassName} >
            <Paper sx={{backgroundColor: 'secondary', py: 6}} >
                <Container maxWidth='md'>
                    <HeaderWithClose
                        title='What are you looking for?'
                        handleClose={setIsSearchActive}
                    />
                    <SearchField />
                    <BasicPreloader
                        isLoading={isLoading}
                        isFetching={isFetching}
                        itemsToShow={2}
                    >
                        <SearchResultPreloader />
                    </BasicPreloader>
                    {!isError && !isFetching && products && products.map( product =>
                        <SearchResultProduct
                            key={product.id}
                            productName={product.name}
                            productColor={product.color}
                            productId={product.id}
                        />
                    )}
                    {products && products.length < 1 &&
                        <Typography>Nothing found(</Typography>
                    }
                    {isError &&
                        <LoadingError reload={refetch} />
                    }
                </Container>
            </Paper>
        </Paper>
    );
};

export default HeaderSearch