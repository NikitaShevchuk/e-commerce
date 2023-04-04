import { type SelectedCartItem } from "@/store/slices/cartSlice/Types";
import { Stack, Typography } from "@mui/material";
import classNames from "classnames";
import React, { type FC } from "react";
import { useGetSizeItems } from "../../components/ProductCard/useGetSizeItems";
import { useTypedDispatch } from "../../hooks/redux";
import { type IProductCard } from "../../types/IProductCard";
import { addToCart } from "../../store/slices/cartSlice/cart-thunks";
import ToggleFavorite from "../ToggleFavorite";
import AddToCartButton, { type ColorVariant } from "./AddToCartButton";

type SizesPosition = "static" | "absolute";

interface Props {
    sizesPosition: SizesPosition;
    colorVariant: ColorVariant;
    product: IProductCard | undefined;
    queryParams: string;
}

const ProductSizes: FC<Props> = ({ sizesPosition, colorVariant, product, queryParams }) => {
    const [selectedSize, setSelectedSize] = React.useState("");
    const dispatch = useTypedDispatch();
    const addToCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (product == null || !selectedSize) return;
        const selectedCartItem: SelectedCartItem = {
            newCartItem: {
                name: product.name,
                price: product.price,
                image: product.image,
                color: product.color,
                createdAt: product.createdAt,
                productId: product.id,
                categoryId: product.categoryId
            },
            size: selectedSize
        };
        dispatch(addToCart(selectedCartItem));
    };
    const sizeItems = useGetSizeItems(product?.sizes, selectedSize, setSelectedSize);

    const blockPosition: string =
        sizesPosition === "absolute" ? "absolute-position" : "static-position";

    return (
        <div className={classNames(blockPosition, "product-sizes")}>
            <Stack direction="row" justifyContent="center" spacing={1}>
                <>{product?.sizes != null ? sizeItems : "No sizes available"}</>
            </Stack>
            <div className="flex">
                {selectedSize ? (
                    <AddToCartButton addToCart={addToCartOnClick} colorVariant={colorVariant} />
                ) : (
                    <Typography variant="caption" sx={{ textAlign: "center" }} component="div">
                        Select a size
                    </Typography>
                )}
                {colorVariant === "gold" && (
                    <ToggleFavorite
                        product={product}
                        colorVariant={selectedSize ? colorVariant : "dark"}
                        queryParams={queryParams}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductSizes;
