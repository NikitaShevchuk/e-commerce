import React from 'react';
import {Container, Typography} from "@mui/material";
import {useGetCategoriesQuery} from "../../services/productsService";
import {NavLink} from "react-router-dom";
import CategoryLoader from "../Loaders/Category/CategoryLoader";
import LoadingError from "../LoadingError";
import BasicPreloader from "../Loaders/BasicPreloader";

const CategoryBlock = () => {
    const {data: categories, isLoading, isError, refetch} = useGetCategoriesQuery('')
    return (
        <Container
            maxWidth='xl'
            className='category-container'
        >
            {isLoading && !isError &&
                <BasicPreloader itemsToShow={2}>
                    <CategoryLoader />
                </BasicPreloader>
            }
            {categories && categories.map( category =>
                <NavLink
                    key={`${category.id}`}
                    className='category-link'
                    to={`/categories/${category.id}/${category.name}`}
                    style={{
                        background: `center / contain no-repeat url(${category.image})`
                    }}
                >
                    <Typography
                        variant='h5'
                        component='span'
                    >
                        {category.name}
                    </Typography>
                </NavLink>
            )}
            {isError && <LoadingError reload={refetch} />}
        </Container>
    );
};

export default CategoryBlock;