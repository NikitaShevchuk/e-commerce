import React from "react";
import qs from "qs";
import { setFilters } from "../../store/slices/filter";
import { useTypedDispatch } from "../redux";
import { setSearchRequest } from "../../store/slices/search";

const useParseQueryParamsToState = () => {
    const dispatch = useTypedDispatch();
    React.useEffect(() => {
        if (window.location.search !== undefined) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(setFilters(params));
            if (params.search !== undefined) dispatch(setSearchRequest(params.search as string));
        }
    }, []);
};
export default useParseQueryParamsToState;
