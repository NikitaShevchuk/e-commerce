import React from 'react';
import {Container} from "@mui/material";
import Products from './Products';
import CategoryHeader from './CategoryHeader';
import {useTypedDispatch} from "../../hooks/redux";
import {useParams} from "react-router-dom";
import qs from 'qs'
import {setFilters} from "../../store/slices/filterSlice";
import ProductsPagination from "./ProductsPagination";

const Category = () => {
	const dispatch = useTypedDispatch();
	let {categoryId, categoryName} = useParams();
	React.useEffect(() => {
			if (window.location.search) {
				const params = qs.parse(window.location.search.substring(1))
				dispatch(setFilters(params))
			}}, []
	)
    return (
        <Container 
			maxWidth='xl' 
			className='product-category__wrapper'
		>
            <CategoryHeader categoryId={categoryId} categoryName={categoryName}/>
            <Products categoryId={categoryId} categoryName={categoryName}/>
			<ProductsPagination />
        </Container>
    );
};

export default Category;

