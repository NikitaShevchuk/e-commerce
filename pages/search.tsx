import Products from "@/components/Category/Products";
import ProductsPagination from "@/components/Category/ProductsPagination";
import SearchPageHeader from "@/components/SearchPageHeader";
import useParseQueryParamsToState from "@/hooks/useParseQueryParamsToState";
import { useGetCategoriesQuery } from "@/services/productsService";
import { Container } from "@mui/material";
import React from "react";

const Search = () => {
    const { data: categories } = useGetCategoriesQuery("");
    const selectedCategoryId = categories ? String(categories[0].id) : "1"
    useParseQueryParamsToState();
    return (
        <Container maxWidth="xl" className="product-category__wrapper">
            <SearchPageHeader />
            <Products categoryId={selectedCategoryId} />
            <ProductsPagination />
        </Container>
    );
};

export default Search;
