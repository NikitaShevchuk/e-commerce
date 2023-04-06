import { useRouter } from "next/router";
import React from "react";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { getFilters } from "@/store/selectors/filter";
import { getSearchSlice } from "@/store/selectors/search";
import { setIsSearchActive, setSearchRequest } from "@/store/slices/search";
import SearchField from "@/features/SearchField";
import CategorySelect from "./CategorySelect";
import { setCurrentPage } from "@/store/slices/filter";

const ProductsSearch = () => {
    const { searchRequestText, isSearchActive } = useTypedSelector((state) => state.searchSlice);
    const { limit } = useTypedSelector(getFilters);
    const { selectedSearchCategory } = useTypedSelector(getSearchSlice);
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const onEnterPress = async () => {
        const categoryTitle =
            selectedSearchCategory !== null ? selectedSearchCategory.title : "Men";
        const shallow = router.pathname.includes("category");
        await router.replace(
            {
                pathname: `/category/[categoryTitle]`,
                query: {
                    categoryTitle,
                    page: "1",
                    limit,
                    title: searchRequestText,
                    keepSearch: "true"
                }
            },
            undefined,
            { shallow }
        );
        dispatch(setIsSearchActive(false));
        dispatch(setCurrentPage("1"));
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
