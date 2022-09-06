import React, {FC, useRef} from 'react'
import ProductCard from '../../components/ProductCard'
import CategoryProductCardLoader from '../../components/Loaders/Category/CategoryProductCardLoader'
import {Grid} from '@mui/material'
import {useGetProductCardsQuery} from "../../services/productsService";
import {useTypedSelector} from "../../hooks/redux";
import {getFilters} from "../../store/selectors/filter";
import useUpdateQuery from "../../hooks/useUpdateQuery";
import BasicPreloader from "../../components/Loaders/BasicPreloader";
import LoadingError from "../../components/LoadingError";

interface Props {
	categoryId: string | undefined,
	categoryName: string | undefined,
	clearSearchRequest?: boolean
}

const Products: FC<Props> = ({categoryId, categoryName, clearSearchRequest = false}) => {
	const {requestQuery} = useTypedSelector(getFilters)
	let isMounted = useRef(false)
	useUpdateQuery(categoryId, categoryName, isMounted, clearSearchRequest)
	const {
		data: products, isLoading, isError, isFetching, refetch
	} = useGetProductCardsQuery(requestQuery)
	return (
		<Grid
			container spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{!isFetching && !isError && products &&
				products.map((product) => (
					<Grid item xs={2} sm={3} md={3} key={product.id}>
						<ProductCard product={product} />
					</Grid>
				))
			}
			<BasicPreloader
				isLoading={isLoading}
				isFetching={isFetching}
				itemsToShow={8}
			>
				<CategoryProductCardLoader />
			</BasicPreloader>
			{isError &&
				<LoadingError reload={refetch} />
			}
		</Grid>
	)
}

export default Products