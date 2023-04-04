import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { type ICategory } from "../types/ICategory";
import { type IProductCard } from "../types/IProductCard";
import { type DefaultResponse } from "@/types/Response";

export const API_URL = "http://localhost:5000/api";

interface AddToFavoriteParams {
    updatedProduct: IProductCard;
    filters: string;
}

interface SearchParams {
    searchRequestText: string | null;
    categoryId: string;
    page: string;
    limit: string;
}

interface SingleCategoryParams {
    categoryId?: string | symbol;
    categoryTitle?: string | symbol;
}

export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (build) => ({
        getProductCards: build.query<DefaultResponse<IProductCard[]>, string>({
            query: (params) => ({
                url: `/product${params}`
            })
        }),
        getSingleProduct: build.query<DefaultResponse<IProductCard>, { productId: string }>({
            query: ({ productId }) => ({
                url: `/product/${productId}`
            })
        }),
        getCategories: build.query<DefaultResponse<ICategory[]>, string>({
            query: (params) => ({
                url: `/category${params}`
            })
        }),
        getSingleCategory: build.query<DefaultResponse<ICategory>, SingleCategoryParams>({
            query: ({ categoryTitle, categoryId }) => ({
                url:
                    categoryId !== undefined
                        ? `/category/${String(categoryId)}`
                        : `/category?title=${String(categoryTitle)}`
            }),
            transformResponse: (returnValue: DefaultResponse<ICategory | Promise<ICategory>>) => {
                if (Array.isArray(returnValue.data)) {
                    return { ...returnValue, data: returnValue.data[0] };
                } else return returnValue;
            }
        }),
        getProductsBySearch: build.query<DefaultResponse<IProductCard[]>, SearchParams>({
            query: ({ searchRequestText, page, limit }) => ({
                url: `/product?page=${page}&limit=${limit}${
                    searchRequestText !== null ? `&title=${searchRequestText}` : ""
                }`
            })
        }),
        addToFavorite: build.mutation<IProductCard, AddToFavoriteParams>({
            query: ({ updatedProduct }) => ({
                url: `/category/${updatedProduct._id}`,
                method: "PUT",
                body: updatedProduct
            }),
            onQueryStarted({ filters, updatedProduct }, { dispatch, queryFulfilled }) {
                const updateProductCard = dispatch(
                    productsAPI.util.updateQueryData("getProductCards", filters, (draft) => {
                        const productIndex = draft.data.findIndex(
                            (item) => item._id === updatedProduct._id
                        );
                        if (productIndex === -1) return;
                        draft.data[productIndex].isFavorite = updatedProduct.isFavorite;
                    })
                );
                const updateSingleProduct = dispatch(
                    productsAPI.util.updateQueryData(
                        "getSingleProduct",
                        {
                            productId: updatedProduct._id
                        },
                        (draft) => {
                            draft.data.isFavorite = updatedProduct.isFavorite;
                        }
                    )
                );
                queryFulfilled.catch(() => {
                    updateProductCard.undo();
                    updateSingleProduct.undo();
                });
            }
        })
    })
});

export const {
    useGetProductCardsQuery,
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    useGetProductsBySearchQuery,
    useAddToFavoriteMutation,
    useGetSingleProductQuery,

    util: { getRunningQueriesThunk }
} = productsAPI;

export const { getCategories, getProductCards, getSingleProduct, getSingleCategory } =
    productsAPI.endpoints;
