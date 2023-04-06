import { useRouter } from "next/router";
import React from "react";
import { getFilters } from "../../store/selectors/filter";
import { getSearchRequest } from "../../store/selectors/search";
import { setQueryRequest } from "../../store/slices/filterSlice";
import { useTypedDispatch, useTypedSelector } from "../redux";
import { getQuery } from "./getQuery";
import { useClearSearchRequest } from "./useClearSearchRequest";

const useUpdateQuery = (
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
        const categoryIdQuery = `categoryId=${String(filters.categoryId)}`;
        if (
            isMounted.current &&
            window.location.search !== "" &&
            window.location.search !==
                filters.requestQuery
                    .replace(`&${categoryIdQuery}`, "")
                    .replace(`?${categoryIdQuery}`, "")
                    .replace(/&&/g, "")
        ) {
            const path = insertCategoryTitle(query, router.query.categoryTitle);
            void router.push(path, undefined, { shallow: true });
        }
        dispatch(setQueryRequest(`?${query}`));
        if (typeof router.query.categoryTitle === "string") isMounted.current = true;
    }, [filters, search]);
};

function insertCategoryTitle(query: string, categoryTitle: string | string[] | undefined) {
    if (typeof categoryTitle !== "string") return `/category/Men?${query}`;
    return `/category/${categoryTitle}?${query}`;
}

export default useUpdateQuery;
