import React, { FC } from "react";
import { Button } from "@mui/material";

export type ColorVariant = "gold" | "dark";

interface Props {
    addToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
    colorVariant: ColorVariant;
}

const AddToCartButton: FC<Props> = ({ addToCart, colorVariant }) => {
    const buttonStyle = {
        backgroundColor: colorVariant === "dark" ? "#181818" : "#D4AF37",
        width: colorVariant === "gold" ? "60%" : "auto"
    };
    return (
        <Button sx={buttonStyle} variant="contained" size="small" onClick={addToCart}>
            Add to cart
        </Button>
    );
};

export default AddToCartButton;
