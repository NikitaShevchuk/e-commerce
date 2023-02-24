import { useRouter } from "next/router";
import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { getFilters } from "../../../store/selectors/filter";
import { getSearchSlice } from "../../../store/selectors/search";
import { setIsSearchActive, setSearchRequest } from "../../../store/slices/searchSlice";
import SearchField from "../../common/SearchField";
import CategorySelect from "./CategorySelect";

const ProductsSearch = () => {
    const { searchRequestText, isSearchActive } = useTypedSelector((state) => state.searchSlice);
    const { currentPage, itemsLimit } = useTypedSelector(getFilters);
    const { selectedSearchCategory } = useTypedSelector(getSearchSlice);
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const onEnterPress = () => {
        const categoryId = selectedSearchCategory ? selectedSearchCategory.id : "1";
        router.replace(
            `/search/${categoryId}?p=${currentPage}&${itemsLimit}${searchRequestText
                ? `&search=${searchRequestText}`
                : ""
            }`
        );
        dispatch(setIsSearchActive(false));
    };
    return (
        <div className="search-wrapper">
            <CategorySelect selectedSearchCategory={selectedSearchCategory} />
            <SearchField
                onEnterPress={onEnterPress}
                updateSearchTextInState={setSearchRequest}
                searchFieldTextInState={searchRequestText}
                isSearchActive={isSearchActive}
            />
        </div>
    );
};

export default ProductsSearch;
