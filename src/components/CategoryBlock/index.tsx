import { Container, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { API_URL, useGetCategoriesQuery } from "../../services/products";
import BasicPreloader from "../Loaders/BasicPreloader";
import CategoryLoader from "../Loaders/Category/CategoryLoader";
import LoadingError from "../LoadingError";

const CategoryBlock = () => {
    const router = useRouter();
    const {
        data: categories,
        isLoading,
        isError,
        refetch
    } = useGetCategoriesQuery(router.query !== undefined ? "" : skipToken, {
        skip: router.isFallback
    });
    return (
        <Container maxWidth="xl" className="category-container">
            {isLoading && !isError && (
                <BasicPreloader itemsToShow={2}>
                    <CategoryLoader />
                </BasicPreloader>
            )}
            {categories?.data.map((category) => (
                <Link
                    key={`${category._id}`}
                    className="category-link"
                    href={{
                        pathname: `/category/[categoryTitle]`,
                        query: { categoryTitle: category.title }
                    }}
                    style={{
                        background: `center / contain no-repeat url(${API_URL}${category.image})`
                    }}
                >
                    <Typography variant="h5" component="span">
                        {category.title}
                    </Typography>
                </Link>
            ))}
            {isError && <LoadingError allowReload={true} reload={refetch} />}
        </Container>
    );
};

export default CategoryBlock;
