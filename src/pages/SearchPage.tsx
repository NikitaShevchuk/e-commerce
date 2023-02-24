import Products from "@/components/Category/Products";
import ProductsPagination from "@/components/Category/ProductsPagination";
import SearchPageHeader from "@/components/SearchPageHeader";
import useParseQueryParamsToState from "@/hooks/useParseQueryParamsToState";
import { Container } from "@mui/material";
import React from "react";

const Search = () => {
    useParseQueryParamsToState();
    return (
        <Container maxWidth="xl" className="product-category__wrapper">
            <SearchPageHeader />
            <Products />
            <ProductsPagination />
        </Container>
    );
};

export default Search;