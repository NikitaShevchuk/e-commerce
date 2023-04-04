import BasicPreloader from "@/components/Loaders/BasicPreloader";
import CategoryProductCardLoader from "@/components/Loaders/Category/CategoryProductCardLoader";
import LoadingError from "@/components/LoadingError";
import { Grid } from "@mui/material";
import React, { type FC } from "react";
import { useGetProducts } from "./hooks/useGetProducts";

export interface ProductsProps {
    clearSearchRequest?: boolean;
}

const Products: FC<ProductsProps> = (props) => {
    const { mappedProducts, isError, isFetching, isLoading, refetch } = useGetProducts(props);

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {mappedProducts}
            {/* <BasicPreloader isLoading={isLoading} isFetching={isFetching} itemsToShow={8}>
                <CategoryProductCardLoader />
                // TODO: add preloader
            </BasicPreloader> */}
            {isError && <LoadingError reload={refetch} />}
        </Grid>
    );
};

export default Products;
