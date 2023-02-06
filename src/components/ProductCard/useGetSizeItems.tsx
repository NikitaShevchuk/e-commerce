import { Paper, Typography } from "@mui/material";
import React from "react";

export const useGetSizeItems = (
    sizes: string[] | undefined,
    selectedSize: string | null,
    setSelectedSize: (selectedSize: string) => void
) => {
    const handleSizeClick = (e: React.MouseEvent<HTMLDivElement>, size: string) => {
        e.preventDefault();
        if (size === selectedSize) return setSelectedSize("");
        setSelectedSize(size);
    };

    const mapProducts = (size: string, i: number) => {
        const paperClassName =
            size === selectedSize ? "product-sizes__item active" : "product-sizes__item";

        if (size)
            return (
                <Paper
                    onClick={(e) => handleSizeClick(e, size)}
                    key={size}
                    className={paperClassName}
                >
                    <Typography>{size} </Typography>
                </Paper>
            );
        else
            return (
                <Paper key={i} className="product-sizes__item inactive">
                    <Typography>Not in stock </Typography>
                </Paper>
            );
    };
    const sizeItems = React.useMemo(
        () => (sizes ? sizes.map(mapProducts) : []),
        [sizes, selectedSize]
    );
    return sizeItems;
};
