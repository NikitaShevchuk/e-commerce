import React from 'react';
import {Container} from "@mui/material";
import Products from './Products';
import CategoryHeader from './CategoryHeader';
import {useGetCategoriesQuery, useGetProductCardsQuery} from '../../services/productsService';
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import qs from 'qs'
import {setFilters} from "../../store/slices/filterSlice";
import {ICategories} from "../../models/ICategories";
import {getFilters} from "../../store/selectors/filter";

export interface categoryResponse {
	data: ICategories | null
	isLoading: boolean
	isError: boolean
}

const Category = () => {
	const dispatch = useTypedDispatch();
	const {categoryId, categoryName} = useParams();
	const {sizes, color, sort} = useTypedSelector(getFilters)
	React.useEffect(
		() => {
			if (window.location.search) {
				const params = qs.parse(window.location.search.substring(1))
				console.log(params)
				dispatch(
					setFilters(params)
				)
			}
		}, [])
	const {
		data: products,
		isLoading: productsIsLoading,
		isError: productsError
	} = useGetProductCardsQuery(
		`${categoryId}/${categoryName}?sizes=${sizes}&color=${color}&sortBy=${sort.sortName}&order=${sort.order}`
	)
	const {
		data: category,
		isLoading: categoryIsLoading,
		isError: categoryHasError
	} = useGetCategoriesQuery<categoryResponse>(`/${categoryId}`)
	const navigate = useNavigate();
	React.useEffect(
		() => {
			const query = qs.stringify({
				sizes,
				color,
				sortBy: sort.sortName,
				order: sort.order
			})
			navigate(`?${query}`)
		},
		[sizes, color, sort]
	)
    return (
        <Container 
			maxWidth='xl' 
			className='product-category__wrapper'
		>
            <CategoryHeader
				data={category}
				isLoading={categoryIsLoading}
				isError={categoryHasError}
			/>
            <Products 
				products={products}
				isLoading={productsIsLoading}
				isError={productsError}
			/>
        </Container>
    );
};

export default Category;

