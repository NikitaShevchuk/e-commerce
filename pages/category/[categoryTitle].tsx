import CategoryPage from "@/pages/CategoryPage";
import {
    getCategories,
    getProductCards,
    getRunningQueriesThunk,
    getSingleCategory
} from "@/services/productsService";
import {
    type FilterSliceInitialState,
    setCategoryId,
    setFilters,
    setQueryRequest
} from "@/store/slices/filterSlice";
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

    // Redirect if there is no page and limit in request query
    const { page, limit } = context.query;
    if (typeof page !== "string" || typeof limit !== "string") {
        return redirectWithParams(store.getState().filterSlice, categoryTitleParam);
    }

    await initiateCategories(store, categoryTitleParam);

    // Extract a category ID to load products from a category with this ID
    const selectedCategory = store.getState().productsAPI.queries[
        `getSingleCategory({"categoryTitle":"${categoryTitleParam}"})`
    ]?.data as DefaultResponse<ICategory>;
    const categoryId = selectedCategory?.data?._id;

    if (categoryId === undefined) {
        return redirectWithParams(store.getState().filterSlice, categoryTitleParam);
    }

    setQueryParamsToState(store, context, categoryId);
    await loadProductsByCategoryId(store, context.query);

    return { props: {} };
});

function redirectWithParams(filterSlice: FilterSliceInitialState, categoryTitleParam: string) {
    const pageFromState = String(filterSlice.page);
    const limitFromState = String(filterSlice.limit);
    return {
        props: {},
        redirect: {
            destination: `/category/${categoryTitleParam}?page=${pageFromState}&limit=${limitFromState}`
        }
    };
}

async function loadProductsByCategoryId(store: AppStore, query: ParsedUrlQuery) {
    const queryParams = qs
        .stringify({ ...query })
        .replace(`categoryTitle=${String(query.categoryTitle)}`, "")
        .replace(`categoryId=${String(query.categoryId)}`, "");
    store.dispatch(setQueryRequest(`?${queryParams}`));
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
