import React, { type FC } from "react";
import { Button, IconButton } from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { type IProductCard } from "../../types/IProductCard";
import { type ColorVariant } from "../ProductSizes/AddToCartButton";
import { useAddToFavoriteMutation } from "../../services/productsService";

interface Props {
    product: IProductCard | undefined;
    colorVariant: ColorVariant;
    queryParams: string;
}

const ToggleFavorite: FC<Props> = ({ product, colorVariant, queryParams }) => {
    const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
    const toggleFavorite = () => {
        if (product?.category === undefined) return;
        const updatedProduct: IProductCard = {
            ...product,
            isFavorite: !product?.isFavorite
        };
        const modifierArgs = {
            filters: queryParams,
            updatedProduct
        };
        if (!isLoading) void addToFavorite(modifierArgs);
    };
    return (
        <div>
            {colorVariant === "gold" && (
                <Button
                    onClick={toggleFavorite}
                    sx={{
                        backgroundColor: "#D4AF37",
                        width: "10%",
                        color: "white",
                        ml: 1
                    }}
                    variant="contained"
                    size="small"
                >
                    {product?.isFavorite !== undefined && product?.isFavorite ? (
                        <Favorite />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                </Button>
            )}

            {colorVariant === "dark" && (
                <IconButton onClick={toggleFavorite} className="product-card__header-item">
                    {product?.isFavorite !== undefined && product?.isFavorite && (
                        <Favorite fontSize="small" />
                    )}
                    {product !== undefined && !product?.isFavorite && (
                        <FavoriteBorderOutlined fontSize="small" />
                    )}
                </IconButton>
            )}
        </div>
    );
};

export default ToggleFavorite;
