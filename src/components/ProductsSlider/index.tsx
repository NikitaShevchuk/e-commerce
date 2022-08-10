import React, {FC} from 'react';
import ProductCard from "../ProductCard";
import {useGetProductCardsQuery} from "../../services/productsService";
import ProductCardLoader from "../Loaders/ProductCardLoader";
import {Container, Stack, Typography} from "@mui/material";
// Import Swiper
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {NavLink} from "react-router-dom";

export interface CategorySliderProps {
    params: string
    blockTitle: string
    categoryLink?: string
}

const ProductsSlider: FC<CategorySliderProps> = ({
    params, blockTitle, categoryLink
}) => {
    const {data, isLoading, error} = useGetProductCardsQuery(params)
    return (<>
        <Container maxWidth='xl'>
            <Stack
                direction='row'
                justifyContent='space-between'
            >
                <Typography variant='h4'>
                    {blockTitle}
                </Typography>
                {categoryLink &&
                    <NavLink to={categoryLink}>View all</NavLink>
                }
            </Stack>
        </Container>
            {!error &&
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    className='custom-swiper'
                >
                    {isLoading &&
                        Array.from(Array(6)).map((_, index) =>
                            <SwiperSlide key={index}>
                                <ProductCardLoader />
                            </SwiperSlide>
                        )}
                    {data &&
                        data.map(item => (
                            <SwiperSlide key={item.id}>
                                <ProductCard {...item} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            }
            {error && 'An error'}
        </>
    );
};

export default ProductsSlider;