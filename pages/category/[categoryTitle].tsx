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
import type { GetServerSidePropsContext, PreviewData } from "next/types";
import qs from "qs";
import type { ParsedUrlQuery } from "querystring";

export default CategoryPage;

const redirectToCategory = {
    props: {},
    redirect: {
        destination: "/category/Men"
    }
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const categoryTitleParam = context.params?.categoryTitle;
    if (typeof categoryTitleParam !== "string") return redirectToCategory;

    const { page, limit } = context.query;
    if (typeof page !== "string" || typeof limit !== "string") {
        const pageFromState = String(store.getState().filterSlice.page);
        const limitFromState = String(store.getState().filterSlice.limit);
        return {
            props: {},
            redirect: {
                destination: `/category/${categoryTitleParam}?page=${pageFromState}&limit=${limitFromState}`
            }
        };
    }

    await initiateCategories(store, categoryTitleParam);

    // Extract category ID to load products from the category with this ID
    const selectedCategory = store.getState().productsAPI.queries[
        `getSingleCategory({"categoryTitle":"${categoryTitleParam}"})`
    ]?.data as DefaultResponse<ICategory>;
    const categoryId = selectedCategory?.data?._id;

    if (categoryId === undefined) return { props: {} };

    setQueryParamsToState(store, context, categoryId);
    await loadProductsByCategoryId(store, categoryId, context.query);

    return { props: {} };
});

async function loadProductsByCategoryId(
    store: AppStore,
    categoryId: string,
    query: ParsedUrlQuery
) {
    const queryParams = qs.stringify({ ...query });
    store.dispatch(setQueryRequest(`product?categoryId=${categoryId}&${queryParams}`));
    void store.dispatch(getProductCards.initiate(`?${queryParams}`));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
}

async function initiateCategories(store: AppStore, categoryTitleParam: string | string[]) {
    void store.dispatch(getCategories.initiate(""));
    void store.dispatch(getSingleCategory.initiate({ categoryTitle: String(categoryTitleParam) }));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
}

function setQueryParamsToState(
    store: AppStore,
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    categoryId: string
) {
    store.dispatch(setFilters(context.query));
    store.dispatch(setCategoryId(categoryId));
    if (typeof context.query?.title === "string") {
        store.dispatch(setSearchRequest(context.query?.title));
    }
}
