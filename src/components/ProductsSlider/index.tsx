import { Container, Stack, Typography } from "@mui/material";
import React, { type FC } from "react";
import { useGetProductCardsQuery } from "../../services/products";
import ProductCard from "../ProductCard";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import Link from "next/link";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingError from "../LoadingError";
import { useResponsiveSlider } from "./hooks/useResponsiveSlider";

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
        isFetching,
        error,
        refetch
    } = useGetProductCardsQuery(router.query !== undefined ? queryParams : skipToken, {
        skip: router.isFallback
    });
    const slidesPerView = useResponsiveSlider();
    return (
        <>
            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4" sx={{ marginTop: 10 }}>
                        {blockTitle}
                    </Typography>
                    {categoryLink !== undefined && <Link href={categoryLink}>View all</Link>}
                </Stack>
                {error === undefined && (
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={20}
                        className="custom-swiper"
                    >
                        {isLoading || isFetching
                            ? Array.from(Array(6)).map((_, index) => (
                                  <SwiperSlide key={index}>
                                      <ProductCard queryParams="" />;
                                  </SwiperSlide>
                              ))
                            : null}

                        {!isLoading &&
                            products !== undefined &&
                            products.data.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <ProductCard product={product} queryParams={queryParams} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                )}
            </Container>

            {error !== undefined && <LoadingError allowReload={true} reload={refetch} />}
        </>
    );
};

export default ProductsSlider;
