import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { ICategory } from "../models/ICategory";
import { IProductCard } from "../models/IProductCard";

export const API_URL = "https://62d8405090883139358e3103.mockapi.io";

interface AddToFavoriteParams {
    updatedProduct: IProductCard;
    categoryId: string;
    filters: string;
}

interface SearchParams {
    searchRequestText: string | null;
    categoryId: string;
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
        getProductCards: build.query<IProductCard[], string>({
            query: (params) => ({
                url: `/categories/${params}`
            })
        }),
        getSingleProduct: build.query<IProductCard, { categoryId: string; productId: string }>({
            query: ({ categoryId, productId }) => ({
                url: `/categories/${categoryId}/${categoryId}/${productId}`
            })
        }),
        getCategories: build.query<ICategory[], string>({
            query: (params) => ({
                url: `/categories${params}`
            })
        }),
        getSingleCategory: build.query<ICategory, string>({
            query: (categoryId) => ({
                url: `/categories/${categoryId}`
            })
        }),
        getProductsBySearch: build.query<IProductCard[], SearchParams>({
            query: ({ searchRequestText, categoryId }) => ({
                url: `/categories/${categoryId}/${categoryId}?p=1&l=8&search=${searchRequestText}`
            })
        }),
        addToFavorite: build.mutation<IProductCard, AddToFavoriteParams>({
            query: ({ categoryId, updatedProduct }) => ({
                url: `/categories/${categoryId}/${categoryId}/${updatedProduct.id}`,
                method: "PUT",
                body: updatedProduct
            }),
            onQueryStarted({ filters, updatedProduct }, { dispatch, queryFulfilled }) {
                const updateProductCard = dispatch(
                    productsAPI.util.updateQueryData("getProductCards", filters, (draft) => {
                        const productIndex = draft.findIndex(
                            (item) => item.id === updatedProduct.id
                        );
                        if (productIndex === -1) return;
                        draft[productIndex].isFavorite = updatedProduct.isFavorite;
                    })
                );
                const updateSingleProduct = dispatch(
                    productsAPI.util.updateQueryData(
                        "getSingleProduct",
                        {
                            categoryId: updatedProduct.categoryId,
                            productId: updatedProduct.id
                        },
                        (draft) => {
                            draft.isFavorite = updatedProduct.isFavorite;
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
