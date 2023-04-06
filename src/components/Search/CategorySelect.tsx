import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import React, { type FC } from "react";
import { useTypedDispatch } from "@/hooks/redux";
import { type ICategory } from "@/types/ICategory";
import { setSelectedCategory } from "@/store/slices/search";
import { useGetCategories } from "./hooks/useGetCategories";

interface Props {
    selectedSearchCategory: ICategory | null;
}

const CategorySelect: FC<Props> = ({ selectedSearchCategory }) => {
    const { data: categories, isLoading } = useGetCategories();

    const dispatch = useTypedDispatch();
    const handleChange = (event: SelectChangeEvent) => {
        const filteredById = categories?.data.filter(
            (singleCategory) => singleCategory.title === event.target.value
        );
        if (filteredById === undefined) return;
        dispatch(setSelectedCategory(filteredById[0]));
    };

    const defaultCategory = categories !== undefined ? categories.data[0].title : "";
    const value = selectedSearchCategory !== null ? selectedSearchCategory.title : defaultCategory;

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
                {categories?.data.map((singleCategory) => (
                    <MenuItem key={singleCategory._id} value={singleCategory.title}>
                        {singleCategory.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
