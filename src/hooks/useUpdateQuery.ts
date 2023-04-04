import { useRouter } from "next/router";
import qs from "qs";
import React from "react";
import { getFilters } from "../store/selectors/filter";
import { getSearchRequest } from "../store/selectors/search";
import { type FilterSliceInitialState, setQueryRequest } from "../store/slices/filterSlice";
import { setSearchRequest } from "../store/slices/searchSlice";
import { useTypedDispatch, useTypedSelector } from "./redux";

const useUpdateQuery = (
    categoryTitle: string | string[] | undefined,
    isMounted: { current: boolean } = { current: false },
    shouldClearSearchRequest: boolean = false
) => {
    const filters = useTypedSelector(getFilters);
    const search = useTypedSelector(getSearchRequest);
    const dispatch = useTypedDispatch();
    const router = useRouter();

    React.useEffect(() => {
        if (shouldClearSearchRequest && search !== null) {
            dispatch(setSearchRequest(null));
        }
        let query = getQuery(filters);
        if (search !== null && !shouldClearSearchRequest) query += `&title=${search}`;
        if (shouldClearSearchRequest) query = query.replace(`&title=${String(search)}`, "");
        if (isMounted.current) {
            void router.push(`?${String(query)}`);
        }
        dispatch(setQueryRequest(`?${query}`));
        if (typeof categoryTitle === "string") isMounted.current = true;
    }, [filters, categoryTitle, search]);
};
export default useUpdateQuery;

function getQuery(filters: FilterSliceInitialState): string {
    return qs.stringify(
        {
            sizes: filters.sizes,
            color: filters.color,
            page: filters.page,
            limit: filters.limit,
            sortBy: filters.sort.property,
            order: filters.sort.order,
            categoryId: filters.categoryId
        },
        { skipNulls: true, arrayFormat: "comma" }
    );
}
