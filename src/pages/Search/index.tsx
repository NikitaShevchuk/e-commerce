import React from 'react';
import {Container} from "@mui/material";
import ProductsPagination from "../Category/ProductsPagination";
import Products from "../Category/Products";
import useParseQueryParamsToState from "../../hooks/useParseQueryParamsToState";
import SearchPageHeader from "./SearchPageHeader";
import {useGetCategoriesQuery} from "../../services/productsService";

const Search = () => {
    const {data: categories} = useGetCategoriesQuery('')
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(
        categories ? String(categories[0].id) : '1'
    )
    useParseQueryParamsToState()
    return (
        <Container
            maxWidth='xl'
            className='product-category__wrapper'
        >
            <SearchPageHeader />
            <Products categoryId={selectedCategoryId} />
            <ProductsPagination />
        </Container>
    );
};

export default Search;