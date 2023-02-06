import React from "react";
import { setIsSearchActive, setSearchRequest } from "../../../store/slices/searchSlice";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { getFilters } from "../../../store/selectors/filter";
import SearchField from "../../common/SearchField";
import CategorySelect from "./CategorySelect";
import { getSearchSlice } from "../../../store/selectors/search";

const ProductsSearch = () => {
    const { searchRequestText, isSearchActive } = useTypedSelector((state) => state.searchSlice);
    const { currentPage, itemsLimit } = useTypedSelector(getFilters);
    const { selectedSearchCategory } = useTypedSelector(getSearchSlice);
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();
    const onEnterPress = () => {
        const id = selectedSearchCategory ? selectedSearchCategory.id : "1";
        navigate(`/search/${id}/${id}?p=${currentPage}&${itemsLimit}&search=${searchRequestText}`);
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
