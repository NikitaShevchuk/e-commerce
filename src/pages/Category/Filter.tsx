import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC } from 'react';
import FilterPreloader from '../../components/Loaders/Category/Filter/FilterPreloader';
import FilterCheckbox from './FilterCheckbox';
import {useTypedDispatch} from "../../hooks/redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


interface Props {
	filterItems?: string[]
	title: string
	filterAction: ActionCreatorWithPayload<string>
}

const Filter: FC<Props> = ({filterItems, title, filterAction}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null)

	const dispatch = useTypedDispatch()
	const handleFilterSelect = (filterProperty: string) => {
		dispatch(filterAction(filterProperty))
	}
	return (
		<div>
		<Button
			id="demo-customized-button"
			aria-controls={open ? 'demo-customized-menu' : undefined}
			aria-haspopup="true"
			aria-expanded={open ? 'true' : undefined}
			variant="text"
			disableElevation
			onClick={handleClick}
			endIcon={<KeyboardArrowDownIcon />}
		>
			{title}
		</Button>
		<Menu
			id="demo-customized-menu"
			MenuListProps={{
			'aria-labelledby': 'demo-customized-button',
			}}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
		>
			{filterItems && filterItems.map(checkBoxName => 
				<FilterCheckbox key={checkBoxName} handleFilterSelect={handleFilterSelect} checkBoxName={checkBoxName} />
			)}
			{!filterItems && <FilterPreloader />}	
		</Menu>
		</div>
	);
}

export default Filter