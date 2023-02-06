import React, { FC, useRef } from "react";
import CategoryProductCardLoader from "../../components/Loaders/Category/CategoryProductCardLoader";
import { Grid } from "@mui/material";
import { useGetProductCardsQuery } from "../../services/productsService";
import { useTypedSelector } from "../../hooks/redux";
import { getFilters } from "../../store/selectors/filter";
import useUpdateQuery from "../../hooks/useUpdateQuery";
import BasicPreloader from "../../components/Loaders/BasicPreloader";
import LoadingError from "../../components/LoadingError";
import { useMapProducts } from "./hooks/useMapProducts";

interface Props {
    categoryId: string;
    clearSearchRequest?: boolean;
}

const Products: FC<Props> = ({ categoryId, clearSearchRequest = false }) => {
    const { requestQuery } = useTypedSelector(getFilters);
    let isMounted = useRef(false);
    useUpdateQuery(categoryId, isMounted, clearSearchRequest);

    const {
        data: products,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useGetProductCardsQuery(requestQuery);

    const mappedProducts = useMapProducts(isError, isFetching, products, requestQuery);

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {mappedProducts}
            <BasicPreloader isLoading={isLoading} isFetching={isFetching} itemsToShow={8}>
                <CategoryProductCardLoader />
            </BasicPreloader>
            {isError && <LoadingError reload={refetch} />}
        </Grid>
    );
};

export default Products;
