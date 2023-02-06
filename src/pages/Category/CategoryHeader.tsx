import Filter from "./Filters/Filter";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import {
    removeColor,
    removeSize,
    setColor,
    setSize,
    setSort
} from "../../store/slices/filterSlice";
import { useGetSingleCategoryQuery } from "../../services/productsService";
import useAddDefaultSortType from "../../hooks/useAddDefaultSortType";

interface Props {
    categoryId: string;
}

const CategoryHeader: FC<Props> = ({ categoryId }) => {
    const { data: category, isLoading, isError, isSuccess } = useGetSingleCategoryQuery(categoryId);
    useAddDefaultSortType(categoryId, isSuccess);
    return (
        <>
            <Typography
                variant="h5"
                color="primary"
                sx={{
                    textTransform: "uppercase",
                    my: 4
                }}
            >
                {category?.name}
            </Typography>

            <Stack className="filters-stack" direction="row">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Filter
                        filterItems={category?.sizes}
                        title="sizes"
                        addFilterProperty={setSize}
                        removeFilterProperty={removeSize}
                        filterType="checkbox"
                    />
                    <Filter
                        filterItems={category?.colors}
                        title="color"
                        addFilterProperty={setColor}
                        removeFilterProperty={removeColor}
                        filterType="checkbox"
                    />
                </Stack>
                <Filter
                    selectMenuItems={category?.sortBy}
                    title="sort"
                    addFilterProperty={setSort}
                    filterType="select"
                />
            </Stack>
        </>
    );
};

export default CategoryHeader;
