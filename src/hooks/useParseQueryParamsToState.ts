import React from "react";
import qs from "qs";
import {setFilters} from "../store/slices/filterSlice";
import {useTypedDispatch} from "./redux";
import {setSearchRequest} from "../store/slices/searchSlice";

const useParseQueryParamsToState = () => {
    const dispatch = useTypedDispatch();
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            dispatch(setFilters(params))
            if (params.search) dispatch(setSearchRequest(params.search))
        }}, []
    )
}
export default useParseQueryParamsToState