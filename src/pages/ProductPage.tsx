import ProductSizes from "@/features/ProductSizes";
import { API_URL, useGetSingleProductQuery } from "@/services/products";
import { Card, CardMedia, Divider, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

import noImage from "@/assets/img/products/no-image.svg";
import Skeleton from "react-loading-skeleton";

export interface ProductQueryParams {
    productId: string;
}

export function ProductPage() {
    const router = useRouter();
    const { productId } = router.query;

    const { data: product } = useGetSingleProductQuery(
        typeof productId === "string" ? { productId } : skipToken,
        { skip: router.isFallback }
    );

    const image =
        typeof product?.data.image === "string" ? API_URL + product?.data.image : noImage.src;

    return (
        <Card className="flex transparent-background product-page__wrapper">
            <Head>
                <title>{product?.data.title ?? "Product"}</title>
            </Head>
            <CardMedia image={image} component="img" className="product-page__image" />

            <div className="product-page__description">
                <div className="flex mb-20">
                    <Typography component="div" variant="h4" sx={{ maxWidth: "80%" }}>
                        {product?.data.title ?? <Skeleton width="30%" inline />}
                    </Typography>
                    <Typography component="div" variant="h3">
                        ${product?.data.price ?? <Skeleton width="10%" inline />}
                    </Typography>
                </div>
                <Divider />
                <Typography mt={1} gutterBottom fontSize="small" textAlign="left">
                    {product?.data.description ?? <Skeleton width="100%" inline />}
                </Typography>
                <ProductSizes
                    product={product?.data}
                    sizesPosition="static"
                    colorVariant="gold"
                    queryParams=""
                />
            </div>
        </Card>
    );
}
