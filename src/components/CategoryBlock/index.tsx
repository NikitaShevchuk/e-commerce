import { Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useGetCategoriesQuery } from "../../services/productsService";
import BasicPreloader from "../Loaders/BasicPreloader";
import CategoryLoader from "../Loaders/Category/CategoryLoader";
import LoadingError from "../LoadingError";

const CategoryBlock = () => {
    const { data: categories, isLoading, isError, refetch } = useGetCategoriesQuery("");
    return (
        <Container maxWidth="xl" className="category-container">
            {isLoading && !isError && (
                <BasicPreloader itemsToShow={2}>
                    <CategoryLoader />
                </BasicPreloader>
            )}
            {categories &&
                categories.map((category) => (
                    <Link
                        key={`${category.id}`}
                        className="category-link"
                        href={`/category/${category.id}`}
                        style={{
                            background: `center / contain no-repeat url(${category.image})`
                        }}
                    >
                        <Typography variant="h5" component="span">
                            {category.name}
                        </Typography>
                    </Link>
                ))}
            {isError && <LoadingError reload={refetch} />}
        </Container>
    );
};

export default CategoryBlock;
