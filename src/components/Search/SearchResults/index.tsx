import { Typography } from "@mui/material";
import React from "react";
import { useTypedSelector } from "@/hooks/redux";
import { useGetProductsBySearchQuery } from "@/services/products";
import { getSearchSlice } from "@/store/selectors/search";
import BasicPreloader from "@/components/Loaders/BasicPreloader";
import LoadingError from "@/components/LoadingError";
import { useMapSearchResultProducts } from "../hooks/useMapSearchResultProducts";
import SingleProduct from "./SingleProduct";

const SearchResults = () => {
    const { searchRequestText, selectedSearchCategory } = useTypedSelector(getSearchSlice);

    const skipRequest = searchRequestText !== null ? searchRequestText.length < 2 : true;
    const {
        data: products,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useGetProductsBySearchQuery(
        {
            searchRequestText,
            categoryId: selectedSearchCategory?._id,
            limit: "5",
            page: "1"
        },
        { skip: skipRequest }
    );
    const mappedProducts = useMapSearchResultProducts(products?.data);
    return (
        <div>
            <BasicPreloader isLoading={isLoading} isFetching={isFetching} itemsToShow={2}>
                <SingleProduct />
            </BasicPreloader>

            {!isError && !isFetching && mappedProducts}

            {products !== undefined && products?.data.length < 1 && (
                <Typography>Nothing found</Typography>
            )}

            {isError && <LoadingError reload={refetch} />}
        </div>
    );
};

export default SearchResults;
