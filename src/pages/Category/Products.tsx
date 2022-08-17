import React, {FC, useRef} from 'react'
import ProductCard from '../../components/ProductCard'
import CategoryProductCardLoader from '../../components/Loaders/Category/CategoryProductCardLoader'
import {Grid} from '@mui/material'
import {useGetProductCardsQuery} from "../../services/productsService";
import {useTypedSelector} from "../../hooks/redux";
import {getFilters} from "../../store/selectors/filter";
import useUpdateQuery from "../../hooks/useUpdateQuery";

interface Props {
	categoryId: string | undefined,
	categoryName: string | undefined
}

const Products: FC<Props> = ({categoryId, categoryName}) => {
	const {requestQuery, itemsLimit} = useTypedSelector(getFilters)
	let isMounted = useRef(false)
	useUpdateQuery(categoryId, categoryName, isMounted)
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
				Array.from(Array(itemsLimit)).map((_, index) => (
					<Grid item xs={2} sm={3} md={3} key={index}>
						<CategoryProductCardLoader />
					</Grid>
				))
			}
			{isError &&
				// todo add error component
				'Error component'
			}
		</Grid>
	)
}

export default Products