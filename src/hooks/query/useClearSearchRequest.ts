import { getSearchRequest } from "@/store/selectors/search";
import { setSearchRequest } from "@/store/slices/search";
import { useTypedDispatch, useTypedSelector } from "../redux";

export const useClearSearchRequest = () => {
    const dispatch = useTypedDispatch();
    const search = useTypedSelector(getSearchRequest);

    return (shouldClear: boolean, query: string): string => {
        let newQuery = query;
        if (shouldClear && search !== null) {
            dispatch(setSearchRequest(null));
        }

        if (search !== null && search !== "" && !shouldClear) newQuery += `&title=${search}`;
        if (shouldClear) newQuery = newQuery.replace(`&title=${String(search)}`, "");

        return newQuery;
    };
};
