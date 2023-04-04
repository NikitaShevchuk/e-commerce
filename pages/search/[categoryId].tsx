import { getQueryParams } from "@/guery-params";
import SearchPage from "@/pages/SearchPage";
import {
    getCategories,
    getProductCards,
    getRunningQueriesThunk,
    getSingleCategory
} from "@/services/productsService";
import { setFilters, setQueryRequest } from "@/store/slices/filterSlice";
import { setSearchRequest } from "@/store/slices/searchSlice";
import { wrapper } from "@/store/store";

export default SearchPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const categoryId = context.query?.categoryId;

    store.dispatch(getCategories.initiate(""));
    if (typeof categoryId === "string") {
        store.dispatch(getSingleCategory.initiate(categoryId));

        if (context.query?.search)
            store.dispatch(setSearchRequest(context.query?.search as string));
        if (!context.query?.p) context.query.p = String(store.getState().filterSlice.currentPage);
        if (!context.query?.l) context.query.l = String(store.getState().filterSlice.itemsLimit);

        store.dispatch(setFilters(context.query));
        const queryParams = getQueryParams(context.query, categoryId);

        if (queryParams) {
            const queryParamsWithoutLimit = queryParams
                .replace(`p=${context.query.p}`, "p=1")
                .replace(`l=${context.query.l}`, "l=999");

            if (context.query?.p && context.query?.l) {
                store.dispatch(
                    getProductCards.initiate(
                        `${categoryId}/${categoryId}?${queryParamsWithoutLimit}`
                    )
                );
            }

            store.dispatch(setQueryRequest(`${categoryId}/${categoryId}?${queryParams}`));
            store.dispatch(getProductCards.initiate(`${categoryId}/${categoryId}?${queryParams}`));
        }
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} };
});
