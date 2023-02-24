import { getQueryParams } from "@/guery-params";
import SearchPage from "@/pages/SearchPage";
import { getCategories, getProductCards, getRunningQueriesThunk, getSingleCategory } from "@/services/productsService";
import { setFilters, setQueryRequest } from "@/store/slices/filterSlice";
import { setSearchRequest } from "@/store/slices/searchSlice";
import { wrapper } from "@/store/store";

export default SearchPage

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const categoryId = context.query?.categoryId;

    if (typeof categoryId === 'string') {
        store.dispatch(getSingleCategory.initiate(categoryId))
        store.dispatch(getCategories.initiate(""))
        store.dispatch(getProductCards.initiate(`${categoryId}/${categoryId}?p=1&l=999`))

        if (context.query?.search) store.dispatch(setSearchRequest(context.query?.search as string));
        if (!context.query?.p) context.query.p = String(store.getState().filterSlice.currentPage);
        if (!context.query?.l) context.query.l = String(store.getState().filterSlice.itemsLimit);

        store.dispatch(setFilters(context.query));
        const queryParams = getQueryParams(context.query, categoryId)
        store.dispatch(setQueryRequest(`${categoryId}/${categoryId}?${queryParams}`))
        store.dispatch(getProductCards.initiate(`${categoryId}/${categoryId}?${queryParams}`))
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} }
})