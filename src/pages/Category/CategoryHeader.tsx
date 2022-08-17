import Filter from './Filters/Filter'
import { Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import {removeColor, removeSize, setColor, setSize, setSort} from "../../store/slices/filterSlice";
import {useGetSingleCategoryQuery} from "../../services/productsService";

interface Props {
	categoryId: string | undefined
	categoryName: string | undefined
}

const CategoryHeader: FC<Props> = ({categoryId, categoryName}) => {
	if (!categoryId) categoryId = '0'
	const {data: category, isLoading, isError} = useGetSingleCategoryQuery(categoryId)
	return (
		<>
			<Typography 
				variant='h5'
				color='primary'
				sx={{
					textTransform: 'uppercase',
					my: 4
				}} 
			>
				{category?.name}
			</Typography>

			<Stack 
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				py={1}
				borderTop='1px solid #181818'
				borderBottom='1px solid #181818'
				mb={4}
			>
				<Stack 
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Filter 
						filterItems={category?.sizes}
						title='sizes'
						addFilterProperty={setSize}
						removeFilterProperty={removeSize}
						filterType='checkbox'
					/>
					<Filter 
						filterItems={category?.colors}
						title='color'
						addFilterProperty={setColor}
						removeFilterProperty={removeColor}
						filterType='checkbox'
					/>
				</Stack>
				<Filter
					selectMenuItems={category?.sortBy}
					title='sort'
					addFilterProperty={setSort}
					filterType='select'
				/>
			</Stack>
		</>
	)
}

export default CategoryHeader

