import React from "react";
import { useGetProductsBySearchQuery } from "../../../../services/productsService";
import { useMapSearchResultProducts } from "../hooks/useMapSearchResultProducts";
import BasicPreloader from "../../../Loaders/BasicPreloader";
import SearchResultPreloader from "../../../Loaders/SearchResultPreloader";
import { Typography } from "@mui/material";
import LoadingError from "../../../LoadingError";
import { useTypedSelector } from "../../../../hooks/redux";
import { getSearchSlice } from "../../../../store/selectors/search";

const SearchResults = () => {
    const { searchRequestText, selectedSearchCategory } = useTypedSelector(getSearchSlice);
    const [skipSearchRequest, setSkipSearchRequest] = React.useState(false);
    React.useEffect(() => {
        const skipRequest = searchRequestText ? searchRequestText.length < 2 : true;
        setSkipSearchRequest(skipRequest);
    }, [searchRequestText]);

    const categoryId = selectedSearchCategory ? selectedSearchCategory.id : "1";
    const {
        data: products,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useGetProductsBySearchQuery({ searchRequestText, categoryId }, { skip: skipSearchRequest });
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
