import CategoryHeader from "@/components/Category/CategoryHeader";
import Products from "@/components/Category/Products";
import ProductsPagination from "@/components/Category/ProductsPagination";
import useParseQueryParamsToState from "@/hooks/useParseQueryParamsToState";
import { Container } from "@mui/material";
import React from "react";

const CategoryPage = () => {
    useParseQueryParamsToState();
    return (
        <Container maxWidth="xl" className="product-category__wrapper">
            <CategoryHeader />
            <Products clearSearchRequest={true} />
            <ProductsPagination />
        </Container>
    );
};

export default CategoryPage;