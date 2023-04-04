import CategoryPage from "@/pages/CategoryPage";
import {
    getCategories,
    getProductCards,
    getRunningQueriesThunk,
    getSingleCategory
} from "@/services/productsService";
import { setFilters, setQueryRequest } from "@/store/slices/filterSlice";
import { setSearchRequest } from "@/store/slices/searchSlice";
import { wrapper } from "@/store/store";
import { type ICategory } from "@/types/ICategory";
import { type DefaultResponse } from "@/types/Response";
import qs from "qs";

export default CategoryPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const categoryTitleParam = context.query?.categoryTitle;
    store.dispatch(getCategories.initiate(""));

    if (typeof categoryTitleParam === "string") {
        store.dispatch(setFilters(context.query));

        if (context.query?.title) store.dispatch(setSearchRequest(context.query?.title as string));
        if (!context.query?.page)
            context.query.page = String(store.getState().filterSlice.currentPage);
        if (!context.query?.limit)
            context.query.limit = String(store.getState().filterSlice.itemsLimit);

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        const categories = store.getState().productsAPI.queries['getCategories("")']
            ?.data as DefaultResponse<ICategory[]>;
        const selectedCategory = categories?.data?.find(
            (category) => category.title === categoryTitleParam
        );

        const queryParams = qs.stringify({ ...context.query, categoryId: selectedCategory?._id });

        store.dispatch(setQueryRequest(`product?${queryParams}`));
        store.dispatch(getProductCards.initiate(`?${queryParams}`));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} };
});
