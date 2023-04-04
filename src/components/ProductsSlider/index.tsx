import { Container, Stack, Typography } from "@mui/material";
import React, { type FC } from "react";
import { useGetProductCardsQuery } from "../../services/productsService";
import ProductCardLoader from "../Loaders/ProductCardLoader";
import ProductCard from "../ProductCard";
// Import Swiper
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import Link from "next/link";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingError from "../LoadingError";

export interface CategorySliderProps {
    queryParams: string;
    blockTitle: string;
    categoryLink?: string;
}

const ProductsSlider: FC<CategorySliderProps> = ({ queryParams, blockTitle, categoryLink }) => {
    const router = useRouter();
    const {
        data: products,
        isLoading,
        error,
        refetch
    } = useGetProductCardsQuery(router.query !== undefined ? queryParams : skipToken, {
        skip: router.isFallback
    });
    return (
        <>
            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4" sx={{ marginTop: 4 }}>
                        {blockTitle}
                    </Typography>
                    {categoryLink !== undefined && <Link href={categoryLink}>View all</Link>}
                </Stack>
            </Container>
            {error == null && (
                <Swiper slidesPerView={6} spaceBetween={20} className="custom-swiper">
                    {isLoading &&
                        Array.from(Array(6)).map((_, index) => (
                            <SwiperSlide key={index}>
                                <ProductCardLoader />
                            </SwiperSlide>
                        ))}
                    {!isLoading &&
                        products != null &&
                        products.data.map((product) => (
                            <SwiperSlide key={product._id}>
                                <ProductCard product={product} queryParams={queryParams} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}
            {error != null && <LoadingError reload={refetch} />}
        </>
    );
};

export default ProductsSlider;
