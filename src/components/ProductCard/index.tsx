import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React, { type FC } from "react";
import ProductSizes from "../../features/ProductSizes";
import { type IProductCard } from "../../types/IProductCard";
import ProductCardHeader from "./ProductCardHeader";
import { API_URL } from "@/services/products";
import noImage from "@/assets/img/products/no-image.svg";
import Skeleton from "react-loading-skeleton";

interface Props {
    product?: IProductCard;
    queryParams: string;
}

const ProductCard: FC<Props> = ({ product, queryParams }) => {
    const image = typeof product?.image === "string" ? API_URL + product.image : noImage.src;
    return (
        <Card className="product-card">
            <ProductCardHeader product={product} queryParams={queryParams} />
            <Link href={`/product/${String(product?._id)}`}>
                <div className="image-wrapper">
                    <CardMedia component="img" image={image} alt="product card" />
                    <ProductSizes
                        sizesPosition="absolute"
                        colorVariant="dark"
                        product={product}
                        queryParams={queryParams}
                    />
                </div>
                <CardContent sx={{ px: 0 }}>
                    <Typography component="div" gutterBottom variant="h3">
                        {product?.title ?? <Skeleton width="40%" inline />}
                    </Typography>
                    <Typography component="div" variant="caption">
                        ${product?.price ?? <Skeleton width="20%" inline />}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProductCard;
