import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useTypedDispatch} from "../../../hooks/redux";
import {setSelectedCategory} from "../../../store/slices/searchSlice";
import {useGetCategoriesQuery} from "../../../services/productsService";
import {ICategory} from "../../../models/ICategory";

interface Props {
    selectedSearchCategory: ICategory | null
}

const CategorySelect: FC<Props> = ({selectedSearchCategory}) => {
    const {data: categories, isLoading, isError} = useGetCategoriesQuery('')
    const dispatch = useTypedDispatch()
    const handleChange = (event: SelectChangeEvent) => {
        const filteredById = categories && categories.filter(
            singleCategory => singleCategory.name === event.target.value
        )
        dispatch(setSelectedCategory(filteredById ? filteredById[0] : null))
    }
    const defaultCategory = categories ? categories[0].name : ''
    const value = selectedSearchCategory ? selectedSearchCategory.name : defaultCategory
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
                sx={{color: '#181818'}}
                id="search-category-select-label"
            >
                Category
            </InputLabel>
            <Select
                labelId="search-category-select-label"
                value={value}
                onChange={handleChange}
                label="Category"
                defaultValue={value}
            >
                {isLoading &&
                    <MenuItem value={defaultCategory}>
                        {defaultCategory}
                    </MenuItem>
                }
                {categories && categories.map(singleCategory =>
                    <MenuItem
                        key={singleCategory.id}
                        value={singleCategory.name}
                    >
                        {singleCategory.name}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default CategorySelect;