import React from 'react';
import {Container} from "@mui/material";
import ProductsPagination from "../Category/ProductsPagination";
import Products from "../Category/Products";
import {useParams} from "react-router-dom";
import useParseQueryParamsToState from "../../hooks/useParseQueryParamsToState";
import SearchPageHeader from "./SearchPageHeader";

const Search = () => {
    let {categoryId, categoryName} = useParams();
    useParseQueryParamsToState()
    return (
        <Container
            maxWidth='xl'
            className='product-category__wrapper'
        >
            <SearchPageHeader />
            <Products
                categoryId={categoryId}
                categoryName={categoryName}
            />
            <ProductsPagination />
        </Container>
    );
};

export default Search;