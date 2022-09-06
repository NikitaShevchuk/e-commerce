import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC } from 'react';
import FilterPreloader from '../../../components/Loaders/Category/Filter/FilterPreloader';
import FilterCheckbox from './FilterCheckbox';
import {useTypedSelector} from "../../../hooks/redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {getFilters} from "../../../store/selectors/filter";
import SortSelect from "./SortSelect";
import {Sort} from "../../../store/slices/filterSlice";

interface Props {
	filterItems?: string[]
	selectMenuItems?: Sort[]
	title: string
	addFilterProperty: ActionCreatorWithPayload<any>
	removeFilterProperty?: ActionCreatorWithPayload<string>
	filterType: 'checkbox' | 'select'
}

const Filter: FC<Props> = ({
	filterItems, title, addFilterProperty, removeFilterProperty, filterType, selectMenuItems
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)
	const filtersFromState = useTypedSelector(getFilters)
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
			{filterType === 'checkbox' && filterItems &&
				filterItems.map(checkBoxName => {
					// todo Must be refactored
					// @ts-ignore
					let isCheckedByDefault = filtersFromState[title] ? !!filtersFromState[title].find( i => i === checkBoxName) : false
					return <FilterCheckbox
						key={checkBoxName}
						checkBoxName={checkBoxName}
						isCheckedByDefault={isCheckedByDefault}
						addFilterProperty={addFilterProperty}
						removeFilterProperty={removeFilterProperty}
					/>
				}
			)}
			{filterType === 'select' && selectMenuItems &&
				selectMenuItems.map(selectMenuItem =>
					<SortSelect
						key={selectMenuItem.property && selectMenuItem.property + selectMenuItem.order}
						selectMenuItem={selectMenuItem}
						addFilterProperty={addFilterProperty}
					/>
				)
			}
			{!filterItems && filterType === 'checkbox' &&
				<FilterPreloader />
			}
			{!selectMenuItems && filterType === 'select' &&
				<FilterPreloader />
			}
		</Menu>
		</div>
	);
}

export default Filter