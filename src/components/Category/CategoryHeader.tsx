import React from "react";
import { Stack, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useRouter } from "next/router";
import useAddDefaultSortType from "../../hooks/sort";
import { useGetSingleCategoryQuery } from "../../services/products";
import { removeColor, removeSize, setColor, setSize } from "../../store/slices/filter";
import Filter from "./Filters/Filter";

const CategoryHeader = () => {
    const router = useRouter();
    const categoryTitle = router.query.categoryTitle;
    const queryParam = {
        categoryTitle: typeof categoryTitle === "string" ? categoryTitle : skipToken
    };

    const { data: category, isSuccess } = useGetSingleCategoryQuery(queryParam, {
        skip: router.isFallback
    });

    useAddDefaultSortType(categoryTitle, isSuccess);

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
                {category?.data.title}
            </Typography>

            <Stack className="filters-stack" direction="row">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Filter
                        filterItems={category?.data.sizes}
                        title="sizes"
                        addFilterProperty={setSize}
                        removeFilterProperty={removeSize}
                        filterType="checkbox"
                    />
                    <Filter
                        filterItems={category?.data.colors}
                        title="color"
                        addFilterProperty={setColor}
                        removeFilterProperty={removeColor}
                        filterType="checkbox"
                    />
                </Stack>
                {/* <Filter 
                    // TODO: Make filters work
                    selectMenuItems={category?.data.sortBy}
                    title="sort"
                    addFilterProperty={setSort}
                    filterType="select"
                /> */}
            </Stack>
        </>
    );
};

export default CategoryHeader;
