import React from 'react';
import {Container, Typography} from "@mui/material";
import {useGetCategoriesQuery} from "../../services/productsService";
import {NavLink} from "react-router-dom";
import CategoryLoader from "../Loaders/Category/CategoryLoader";

const CategoryBlock = () => {
    const {data: categories, isLoading, error} = useGetCategoriesQuery('')
    return (
        <Container
            maxWidth='xl'
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            {isLoading && [1, 2].map((_, index) => <CategoryLoader key={index} />)}
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
            {error && 'An error'}
        </Container>
    );
};

export default CategoryBlock;