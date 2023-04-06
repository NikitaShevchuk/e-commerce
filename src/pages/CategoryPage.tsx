import CategoryHeader from "@/components/Category/CategoryHeader";
import Products from "@/components/Category/Products";
import SearchPageHeader from "@/components/Search/SearchPageHeader";
// import ProductsPagination from "@/components/Category/ProductsPagination";
import useParseQueryParamsToState from "@/hooks/query/useParseQueryParamsToState";
import { Container } from "@mui/material";
import React, { type FC } from "react";

export interface CategoryPageProps {
    includesSearch?: boolean;
}

const CategoryPage: FC<CategoryPageProps> = ({ includesSearch = false }) => {
    useParseQueryParamsToState();
    return (
        <Container maxWidth="xl" className="product-category__wrapper">
            {includesSearch ? <SearchPageHeader /> : <CategoryHeader />}
            <Products clearSearchRequest={!includesSearch} />
            {/* <ProductsPagination /> 
                //TODO: add pagination */}
        </Container>
    );
};

export default CategoryPage;
