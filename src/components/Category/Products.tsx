import BasicPreloader from "@/components/Loaders/BasicPreloader";
import LoadingError from "@/components/LoadingError";
import { Grid } from "@mui/material";
import React, { type FC } from "react";
import { useGetProducts } from "./hooks/useGetProducts";
import ProductCard from "../ProductCard";

export interface ProductsProps {
    clearSearchRequest?: boolean;
}

const Products: FC<ProductsProps> = (props) => {
    const { mappedProducts, isError, isFetching, isLoading, refetch } = useGetProducts(props);

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {mappedProducts}
            {mappedProducts.length < 1 && !isLoading && !isFetching && (
                <LoadingError text="No products to display!" />
            )}
            <BasicPreloader isLoading={isLoading} isFetching={isFetching} itemsToShow={8}>
                <Grid item xs={2} sm={3} md={3}>
                    <ProductCard queryParams="" />;
                </Grid>
            </BasicPreloader>

            {isError && <LoadingError allowReload reload={refetch} />}
        </Grid>
    );
};

export default Products;
