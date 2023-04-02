import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { useTypedDispatch } from "../../../hooks/redux";
import { ICategory } from "../../../types/ICategory";
import { setSelectedCategory } from "../../../store/slices/searchSlice";
import { useGetCategories } from "./hooks/useGetCategories";

interface Props {
    selectedSearchCategory: ICategory | null;
}

const CategorySelect: FC<Props> = ({ selectedSearchCategory }) => {
    const { data: categories, isLoading } = useGetCategories()

    const dispatch = useTypedDispatch();
    const handleChange = (event: SelectChangeEvent) => {
        const filteredById =
            categories &&
            categories.data.filter((singleCategory) => singleCategory.title === event.target.value);
        dispatch(setSelectedCategory(filteredById ? filteredById[0] : null));
    };

    const defaultCategory = categories ? categories.data[0].title : "";
    const value = selectedSearchCategory ? selectedSearchCategory.title : defaultCategory;

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel sx={{ color: "#181818" }} id="search-category-select-label">
                Category
            </InputLabel>
            <Select
                labelId="search-category-select-label"
                value={value}
                onChange={handleChange}
                label="Category"
                defaultValue={value}
            >
                {isLoading && <MenuItem value={defaultCategory}>{defaultCategory}</MenuItem>}
                {categories &&
                    categories.data.map((singleCategory) => (
                        <MenuItem key={singleCategory._id} value={singleCategory.title}>
                            {singleCategory.title}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
