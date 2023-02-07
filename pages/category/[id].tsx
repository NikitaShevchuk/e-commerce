import React from "react";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import CategoryHeader from "@/components/Category/CategoryHeader";
import Products from "@/components/Category/Products";
import ProductsPagination from "@/components/Category/ProductsPagination";
import useParseQueryParamsToState from "@/hooks/useParseQueryParamsToState";

const Category = () => {
    let categoryId = useRouter().query.id as string;
    if (!categoryId) categoryId = "1";
    useParseQueryParamsToState();
    return (
        <Container maxWidth="xl" className="product-category__wrapper">
            <CategoryHeader categoryId={categoryId} />
            <Products clearSearchRequest={true} categoryId={categoryId} />
            <ProductsPagination />
        </Container>
    );
};

export default Category;
