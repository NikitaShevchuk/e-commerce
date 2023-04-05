import { Typography } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../../hooks/redux";
import { useGetProductsBySearchQuery } from "../../../../services/products";
import { getSearchSlice } from "../../../../store/selectors/search";
import BasicPreloader from "../../../Loaders/BasicPreloader";
import SearchResultPreloader from "../../../Loaders/SearchResultPreloader";
import LoadingError from "../../../LoadingError";
import { useMapSearchResultProducts } from "../hooks/useMapSearchResultProducts";
import { getFilters } from "@/store/selectors/filter";

const SearchResults = () => {
    const { searchRequestText, selectedSearchCategory } = useTypedSelector(getSearchSlice);
    const { limit, page } = useTypedSelector(getFilters);

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
            limit: String(limit),
            page: String(page)
        },
        { skip: skipRequest }
    );
    const mappedProducts = useMapSearchResultProducts(products?.data);
    return (
        <div>
            <BasicPreloader isLoading={isLoading} isFetching={isFetching} itemsToShow={2}>
                <SearchResultPreloader />
            </BasicPreloader>

            {!isError && !isFetching && mappedProducts}

            {products != null && products?.data.length < 1 && (
                <Typography>Nothing found</Typography>
            )}

            {isError && <LoadingError reload={refetch} />}
        </div>
    );
};

export default SearchResults;
