import { Container, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useGetProductCardsQuery } from "../../services/productsService";
import ProductCardLoader from "../Loaders/ProductCardLoader";
import ProductCard from "../ProductCard";
// Import Swiper
import Link from "next/link";
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
    const { data: products, isLoading, error, refetch } = useGetProductCardsQuery(queryParams);
    return (
        <>
            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4" sx={{ marginTop: 4 }}>
                        {blockTitle}
                    </Typography>
                    {categoryLink && <Link href={categoryLink}>View all</Link>}
                </Stack>
            </Container>
            {!error && (
                <Swiper slidesPerView={6} spaceBetween={20} className="custom-swiper">
                    {isLoading &&
                        Array.from(Array(6)).map((_, index) => (
                            <SwiperSlide key={index}>
                                <ProductCardLoader />
                            </SwiperSlide>
                        ))}
                    {!isLoading &&
                        products &&
                        products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} queryParams={queryParams} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}
            {error && <LoadingError reload={refetch} />}
        </>
    );
};

export default ProductsSlider;
