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
import LoadingError from "../LoadingError";

export interface CategorySliderProps {
    queryParams: string
    blockTitle: string
    categoryLink?: string
}

const ProductsSlider: FC<CategorySliderProps> = ({
    queryParams, blockTitle, categoryLink
}) => {
    const {data: products, isLoading, error, refetch} = useGetProductCardsQuery(queryParams)
    return (<>
        <Container maxWidth='xl'>
            <Stack
                direction='row'
                justifyContent='space-between'
            >
                <Typography variant='h4' sx={{marginTop: 4}}>
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
                        )
                    }
                    {!isLoading && products &&
                        products.map(product => (
                            <SwiperSlide key={product.id}>
                                <ProductCard 
                                    product={product} 
                                    queryParams={queryParams}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
            {error && <LoadingError reload={refetch} />}
        </>
    );
};

export default ProductsSlider;