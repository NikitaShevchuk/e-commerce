import CategoryPage from "@/pages/CategoryPage";
import {
    getCategories,
    getProductCards,
    getRunningQueriesThunk,
    getSingleCategory
} from "@/services/productsService";
import { setCategoryId, setFilters, setQueryRequest } from "@/store/slices/filterSlice";
import { setSearchRequest } from "@/store/slices/searchSlice";
import { type AppStore, wrapper } from "@/store/store";
import { type ICategory } from "@/types/ICategory";
import { type DefaultResponse } from "@/types/Response";
import qs from "qs";
import { type ParsedUrlQuery } from "querystring";

export default CategoryPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const categoryTitleParam = context.params?.categoryTitle as string | string[];
    if (typeof categoryTitleParam !== "string") return { props: {} };

    await initiateCategories(store, categoryTitleParam);

    // Extract category ID to load products from the category with this ID
    const selectedCategory = store.getState().productsAPI.queries[
        `getSingleCategory({"categoryTitle":"${categoryTitleParam}"})`
    ]?.data as DefaultResponse<ICategory>;
    const categoryId = selectedCategory?.data?._id;

    setQueryParamsToState(store, context.query, categoryId);
    await loadProductsByCategoryId(store, categoryId, context.query);

    return { props: {} };
});

async function loadProductsByCategoryId(
    store: AppStore,
    categoryId: string,
    query: ParsedUrlQuery
) {
    const queryParams = qs.stringify({ ...query, categoryId });
    store.dispatch(setQueryRequest(`product?${queryParams}`));
    void store.dispatch(getProductCards.initiate(`?${queryParams}`));
    return await Promise.all(store.dispatch(getRunningQueriesThunk()));
}

async function initiateCategories(store: AppStore, categoryTitleParam: string | string[]) {
    void store.dispatch(getCategories.initiate(""));
    void store.dispatch(getSingleCategory.initiate({ categoryTitle: String(categoryTitleParam) }));
    return await Promise.all(store.dispatch(getRunningQueriesThunk()));
}

function setQueryParamsToState(store: AppStore, query: ParsedUrlQuery, categoryId: string) {
    store.dispatch(setFilters(query));
    store.dispatch(setCategoryId(categoryId));
    if (typeof query?.title === "string") store.dispatch(setSearchRequest(query?.title));
}
