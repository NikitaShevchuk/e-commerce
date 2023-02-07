import React from "react";
import { Container } from "@mui/material";
import Products from "./Products";
import CategoryHeader from "./CategoryHeader";
import { useParams } from "react-router-dom";
import ProductsPagination from "./ProductsPagination";
import useParseQueryParamsToState from "../../hooks/useParseQueryParamsToState";

const Category = () => {
    let categoryId = useParams().categoryId;
    if (!categoryId) categoryId = "0";
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
