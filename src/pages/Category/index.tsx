import React from 'react';
import {Container} from "@mui/material";
import Products from './Products';
import CategoryHeader from './CategoryHeader';
import {useParams} from "react-router-dom";
import ProductsPagination from "./ProductsPagination";
import useParseQueryParamsToState from "../../hooks/useParseQueryParamsToState";

const Category = () => {
	let {categoryId, categoryName} = useParams();
	useParseQueryParamsToState()
    return (
        <Container 
			maxWidth='xl' 
			className='product-category__wrapper'
		>
            <CategoryHeader
				categoryId={categoryId}
				categoryName={categoryName}
			/>
            <Products
				categoryId={categoryId}
				categoryName={categoryName}
				clearSearchRequest={true}
			/>
			<ProductsPagination />
        </Container>
    );
};

export default Category;

