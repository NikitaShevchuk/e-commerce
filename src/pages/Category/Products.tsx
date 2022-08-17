import React, {FC, useRef} from 'react'
import ProductCard from '../../components/ProductCard'
import CategoryProductCardLoader from '../../components/Loaders/Category/CategoryProductCardLoader'
import {Grid} from '@mui/material'
import {useGetProductCardsQuery} from "../../services/productsService";
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {getFilters} from "../../store/selectors/filter";
import {setQueryRequest} from "../../store/slices/filterSlice";

interface Props {
	categoryId: string | undefined,
	categoryName: string | undefined
}

const Products: FC<Props> = ({categoryId, categoryName}) => {
	const {sizes, color, sort, requestQuery} = useTypedSelector(getFilters)
	let isMounted = useRef(false)
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()
	React.useEffect(
		() => {
			const query = qs.stringify(
				{sizes, color, sortBy: sort.property, order: sort.order},
				{skipNulls: true, arrayFormat: 'comma'}
			)
			if (isMounted.current) navigate(`?${query}`)
			dispatch(setQueryRequest(`${categoryId}/${categoryName}?${query}`))
			isMounted.current = true
		},
		[sizes, color, sort, categoryName, categoryId]
	)
	const {data: products, isLoading, isError} = useGetProductCardsQuery(requestQuery)
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{products &&
				products.map((product) => (
					<Grid item xs={2} sm={3} md={3} key={product.id}>
						<ProductCard {...product} />
					</Grid>
				))
			}
			{isLoading &&
				Array.from(Array(8)).map((_, index) => (
					<Grid item xs={2} sm={3} md={3} key={index}>
						<CategoryProductCardLoader />
					</Grid>
				))
			}
			{isError &&
				'Error component'
			}
		</Grid>
	)
}

export default Products