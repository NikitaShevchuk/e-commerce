import React, { FC, useState } from 'react'
import CheckBox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';

interface Props {
	checkBoxName: string
	handleFilterSelect: (filterProperty: string) => void
}

const FilterCheckbox: FC<Props> = ({checkBoxName, handleFilterSelect}) => {
	let [isChecked, setIsChecked] = useState(false)
	const handleClick = () => {
		setIsChecked(!isChecked)
		handleFilterSelect(checkBoxName)
	}
	return (
	<MenuItem 
		sx={{pr: 3, pl: 1}} 
		disableRipple
	>
		<CheckBox 
			checked={isChecked}
			onClick={handleClick}
			name={checkBoxName}
			sx={{
				color: '#181818',
				'&.Mui-checked': {
					color: '#181818',
				},
				}}
		/>
		<label htmlFor={checkBoxName}>
			{checkBoxName}
		</label>
	</MenuItem>
	)
}

export default FilterCheckbox