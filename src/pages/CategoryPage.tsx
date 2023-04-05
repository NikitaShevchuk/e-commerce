import CategoryHeader from "@/components/Category/CategoryHeader";
import Products from "@/components/Category/Products";
// import ProductsPagination from "@/components/Category/ProductsPagination";
import useParseQueryParamsToState from "@/hooks/useParseQueryParamsToState";
import { Container } from "@mui/material";
import React, { type FC } from "react";

export interface CategoryPageProps {
    clearSearch?: boolean;
}

const CategoryPage: FC<CategoryPageProps> = ({ clearSearch = true }) => {
    useParseQueryParamsToState();
    return (
        <Container maxWidth="xl" className="product-category__wrapper">
            <CategoryHeader />
            <Products clearSearchRequest={clearSearch} />
            {/* <ProductsPagination /> 
                //TODO: add pagination */}
        </Container>
    );
};

export default CategoryPage;
