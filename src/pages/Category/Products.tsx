import React, {FC} from 'react'
import ProductCard from '../../components/ProductCard'
import CategoryProductCardLoader from '../../components/Loaders/Category/CategoryProductCardLoader'
import {Grid} from '@mui/material'
import { IProductCard } from '../../models/IProductCard'

interface Props {
    products: IProductCard[] | undefined
	isLoading: boolean
	isError: boolean
}

const Products: FC<Props> = ({products, isLoading, isError}) => {
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