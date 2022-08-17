import React, { FC, useState } from 'react'
import CheckBox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import {useTypedDispatch} from "../../../hooks/redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface Props {
	checkBoxName: string
	isCheckedByDefault: boolean
	addFilterProperty: ActionCreatorWithPayload<any>
	removeFilterProperty?: ActionCreatorWithPayload<string>
}

const FilterCheckbox: FC<Props> = ({
	checkBoxName, isCheckedByDefault, removeFilterProperty, addFilterProperty
}) => {
	let [isChecked, setIsChecked] = useState(isCheckedByDefault)
	const dispatch = useTypedDispatch()
	const handleClick = () => {
		isChecked && removeFilterProperty
			? dispatch(removeFilterProperty(checkBoxName))
			: dispatch(addFilterProperty(checkBoxName))
		setIsChecked(!isChecked)
	}
	return (
		<MenuItem
			sx={{pr: 3, pl: 1}}
			disableRipple
			onClick={handleClick}
		>
			<CheckBox
				checked={isChecked}
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