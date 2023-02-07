import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import ProductSizes from "../../features/ProductSizes";
import { IProductCard } from "../../models/IProductCard";
import ProductCardHeader from "./ProductCardHeader";

interface Props {
    product: IProductCard;
    queryParams: string;
}

const ProductCard: FC<Props> = ({ product, queryParams }) => {
    return (
        <Card className="product-card">
            <ProductCardHeader product={product} queryParams={queryParams} />
            <Link href={`/product/${product.categoryId}/${product.id}`}>
                <div className="image-wrapper">
                    <CardMedia component="img" image={product.image} alt="product card" />
                    <ProductSizes
                        sizesPosition="absolute"
                        colorVariant="dark"
                        product={product}
                        queryParams={queryParams}
                    />
                </div>
                <CardContent sx={{ px: 0 }}>
                    <Typography component="div" gutterBottom variant="h3">
                        {product.name}
                    </Typography>
                    <Typography component="div" variant="caption">
                        ${product.price}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProductCard;
