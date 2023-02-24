import { useRouter } from "next/router";
import qs from "qs";
import React from "react";
import { getFilters } from "../store/selectors/filter";
import { getSearchRequest } from "../store/selectors/search";
import { setQueryRequest } from "../store/slices/filterSlice";
import { setSearchRequest } from "../store/slices/searchSlice";
import { useTypedDispatch, useTypedSelector } from "./redux";

const useUpdateQuery = (
    categoryId: string | string[] | undefined,
    isMounted: { current: boolean } = { current: false },
    shouldClearSearchRequest: boolean = false
) => {
    const { sizes, color, sort, currentPage, itemsLimit } = useTypedSelector(getFilters);
    const search = useTypedSelector(getSearchRequest);
    const dispatch = useTypedDispatch();
    const router = useRouter();

    React.useEffect(() => {
        if (shouldClearSearchRequest && router.query.search && search) {
            dispatch(setSearchRequest(null));
        }
        let query = qs.stringify(
            {
                sizes,
                color,
                p: currentPage,
                l: itemsLimit,
                sortBy: sort.property,
                order: sort.order
            },
            { skipNulls: true, arrayFormat: "comma" }
        );
        if (search) query += search;
        if (isMounted.current) {
            router.push(`${categoryId}?${query}`);
        }
        dispatch(setQueryRequest(`${categoryId}/${categoryId}?${query}`));
        if (typeof categoryId === "string" && categoryId !== "undefined") isMounted.current = true;
    }, [sizes, color, sort, categoryId, currentPage, itemsLimit, search]);
};
export default useUpdateQuery;
