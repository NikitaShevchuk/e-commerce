import React, { FC } from "react";
import { Typography } from "@mui/material";
import ToggleFavorite from "../../features/ToggleFavorite";
import { IProductCard } from "../../models/IProductCard";

interface Props {
    product: IProductCard | undefined;
    queryParams: string;
}

const ProductCardHeader: FC<Props> = ({ product, queryParams }) => {
    return (
        <div className="product-card__header">
            {product?.isNew && (
                <Typography className="product-card__header-item __new">New</Typography>
            )}
            <ToggleFavorite product={product} queryParams={queryParams} colorVariant="dark" />
        </div>
    );
};

export default ProductCardHeader;
