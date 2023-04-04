import React from "react";
import { Grid } from "@mui/material";
import { type IProductCard } from "../../../types/IProductCard";
import ProductCard from "../../../components/ProductCard";

export const useMapProducts = (
    isError: boolean,
    isFetching: boolean,
    products: IProductCard[] | undefined,
    queryParams: string
) =>
    React.useMemo(() => {
        const shouldMapProducts = !isFetching && !isError && products;
        if (shouldMapProducts)
            return products.map((product) => (
                <Grid item xs={2} sm={3} md={3} key={product._id}>
                    <ProductCard product={product} queryParams={queryParams} />
                </Grid>
            ));
        else return [];
    }, [products, isFetching, isError]);
