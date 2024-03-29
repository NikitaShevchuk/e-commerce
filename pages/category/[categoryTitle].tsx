import CategoryPage, { type CategoryPageProps } from "@/pages/CategoryPage";
import {
    getCategories,
    getProductCards,
    getRunningQueriesThunk,
    getSingleCategory
} from "@/services/products";
import {
    type FilterSliceInitialState,
    setCategoryId,
    setFilters,
    setQueryRequest
} from "@/store/slices/filter";
import { setSearchRequest } from "@/store/slices/search";
import { type AppStore, wrapper } from "@/store/store";
import { type ICategory } from "@/types/ICategory";
import { type DefaultResponse } from "@/types/Response";
import type { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next/types";
import qs from "qs";
import type { ParsedUrlQuery } from "querystring";

export default CategoryPage;

type PageProps = GetServerSidePropsResult<CategoryPageProps>;

const redirectToCategory: PageProps = {
    props: {},
    redirect: {
        destination: "/category/Men",
        permanent: true
    }
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context): Promise<PageProps> => {
            const categoryTitleParam = context.params?.categoryTitle;
            const keepSearch = context.params?.keepSearch;
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

            const shouldKeepSearchRequest =
                typeof keepSearch === "string" ? keepSearch === "true" : false;
            const hasTitleQueryParam = typeof context.query?.title === "string";
            const includesSearch = shouldKeepSearchRequest && hasTitleQueryParam;
            return { props: { includesSearch } };
        }
);

function redirectWithParams(
    filterSlice: FilterSliceInitialState,
    categoryTitleParam: string
): PageProps {
    const pageFromState = String(filterSlice.page);
    const limitFromState = String(filterSlice.limit);
    return {
        props: {},
        redirect: {
            destination: `/category/${categoryTitleParam}?page=${pageFromState}&limit=${limitFromState}`,
            permanent: true
        }
    };
}

async function loadProductsByCategoryId(store: AppStore, query: ParsedUrlQuery) {
    const categoryTitle = `categoryTitle=${String(query.categoryTitle)}`;
    const categoryId = `categoryId=${String(query.categoryId)}`;
    const queryParams = qs
        .stringify({ ...query })
        .replace(`?${categoryTitle}`, "")
        .replace(`&${categoryTitle}`, "")
        .replace(`?${categoryId}`, "")
        .replace(`&${categoryId}`, "");
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
