import { useRouter } from "next/router";
import React from "react";
import { getFilters } from "../../store/selectors/filter";
import { getSearchRequest } from "../../store/selectors/search";
import { setQueryRequest } from "../../store/slices/filterSlice";
import { useTypedDispatch, useTypedSelector } from "../redux";
import { getQuery } from "./getQuery";
import { useClearSearchRequest } from "./useClearSearchRequest";

const useUpdateQuery = (
    categoryTitle: string | string[] | undefined,
    isMounted: { current: boolean } = { current: false },
    clearSearchRequest: boolean = false
) => {
    const filters = useTypedSelector(getFilters);
    const search = useTypedSelector(getSearchRequest);
    const dispatch = useTypedDispatch();
    const router = useRouter();
    const clearSearch = useClearSearchRequest();

    React.useEffect(() => {
        const query = clearSearch(clearSearchRequest, getQuery(filters));
        if (isMounted.current && window.location.search !== filters.requestQuery) {
            void router.push({
                pathname: `/category/[categoryTitle]?${String(query)}`,
                query: { categoryTitle }
            });
        }
        dispatch(setQueryRequest(`?${query}`));
        if (typeof categoryTitle === "string") isMounted.current = true;
    }, [filters, categoryTitle, search]);
};
export default useUpdateQuery;
