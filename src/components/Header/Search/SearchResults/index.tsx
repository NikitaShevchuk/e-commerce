import { Typography } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../../hooks/redux";
import { useGetProductsBySearchQuery } from "../../../../services/productsService";
import { getSearchSlice } from "../../../../store/selectors/search";
import BasicPreloader from "../../../Loaders/BasicPreloader";
import SearchResultPreloader from "../../../Loaders/SearchResultPreloader";
import LoadingError from "../../../LoadingError";
import { useMapSearchResultProducts } from "../hooks/useMapSearchResultProducts";

const SearchResults = () => {
    const { searchRequestText, selectedSearchCategory } = useTypedSelector(getSearchSlice);
    const [skipSearchRequest, setSkipSearchRequest] = React.useState(false);
    React.useEffect(() => {
        const skipRequest = searchRequestText ? searchRequestText.length < 2 : true;
        setSkipSearchRequest(skipRequest);
    }, [searchRequestText]);

    const {
        data: products,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useGetProductsBySearchQuery(
        { searchRequestText, categoryId: selectedSearchCategory?.id || "1" },
        { skip: skipSearchRequest }
    );
    const mappedProducts = useMapSearchResultProducts(products);
    return (
        <div>
            <BasicPreloader isLoading={isLoading} isFetching={isFetching} itemsToShow={2}>
                <SearchResultPreloader />
            </BasicPreloader>

            {!isError && !isFetching && mappedProducts}

            {products && products.length < 1 && <Typography>Nothing found(</Typography>}

            {isError && <LoadingError reload={refetch} />}
        </div>
    );
};

export default SearchResults;
