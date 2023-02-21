import { Stack, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useAddDefaultSortType from "../../hooks/useAddDefaultSortType";
import { useGetSingleCategoryQuery } from "../../services/productsService";
import {
    removeColor,
    removeSize,
    setColor,
    setSize,
    setSort
} from "../../store/slices/filterSlice";
import Filter from "./Filters/Filter";


const CategoryHeader = () => {
    const router = useRouter();
    const categoryId = router.query.id;
    const queryParam = typeof categoryId === "string" ? categoryId : skipToken;

    const { data: category, isSuccess } = useGetSingleCategoryQuery(queryParam, { skip: router.isFallback });

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
