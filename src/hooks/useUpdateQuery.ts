import {useTypedDispatch, useTypedSelector} from "./redux";
import {useNavigate} from "react-router-dom";
import React from "react";
import qs from "qs";
import {setQueryRequest} from "../store/slices/filterSlice";
import {getFilters} from "../store/selectors/filter";
import {getSearchRequest} from "../store/selectors/search";
import {setSearchRequest} from "../store/slices/searchSlice";

const useUpdateQuery = (
    categoryId: string | undefined,
    isMounted: {current: boolean},
    shouldClearSearchRequest: boolean = false
) => {
    const {sizes, color, sort, currentPage, itemsLimit} = useTypedSelector(getFilters)
    const search = useTypedSelector(getSearchRequest)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    React.useEffect(
        () => {
            if (shouldClearSearchRequest) dispatch(setSearchRequest(null))
            const query = qs.stringify(
                {sizes, color, p: currentPage, l: itemsLimit, sortBy: sort.property, order: sort.order, search},
                {skipNulls: true, arrayFormat: 'comma'}
            )
            if (isMounted.current) navigate(`?${query}`)
            dispatch(setQueryRequest(`${categoryId}/${categoryId}?${query}`))
            isMounted.current = true
        },
        [sizes, color, sort, categoryId, currentPage, itemsLimit, search]
    )
}
export default useUpdateQuery