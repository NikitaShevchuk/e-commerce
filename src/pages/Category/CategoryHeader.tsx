import Filter from './Filter'
import { Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import {setColor, setSize} from "../../store/slices/filterSlice";
import {categoryResponse} from "./index";

interface Props extends categoryResponse {}

const CategoryHeader: FC<Props> = ({data}) => {
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
				{data?.name}
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
						filterItems={data?.sizes}
						title='Sizes'
						filterAction={setSize}
					/>
					<Filter 
						filterItems={data?.colors}
						title='Colors'
						filterAction={setColor}
					/>
				</Stack>
			</Stack>
		</>
	)
}

export default CategoryHeader

