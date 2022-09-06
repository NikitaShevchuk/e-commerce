import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProductCard} from "../models/IProductCard";
import {ICategory} from "../models/ICategory";

export const API_URL = 'https://62d8405090883139358e3103.mockapi.io'

interface ModifierArgs {
    updatedProduct: IProductCard
    categoryId: string
    filters: string
}

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getProductCards: build.query<IProductCard[], string>({
            query: (params) => ({
                url: `/categories/${params}`
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
        getProductsBySearch: build.query<IProductCard[], string | null>({
            query: (searchRequestText) => ({
                url: `/categories/1/men?p=1&l=8&search=${searchRequestText}`
            })
        }),
        modifyFavorite: build.mutation<IProductCard, ModifierArgs>({
            query: (modifierArgs) => ({
                url: `/categories/${modifierArgs.categoryId}/men/${modifierArgs.updatedProduct.id}`,
                method: 'PUT',
                body: modifierArgs.updatedProduct
            }),
            onQueryStarted({filters, updatedProduct}, {dispatch, queryFulfilled}) {
                const updateProductCard = dispatch(
                    productsAPI.util.updateQueryData('getProductCards', filters, (draft) => {
                        const productIndex = draft.findIndex( item => item.id === updatedProduct.id )
                        if (productIndex === -1) return
                        draft[productIndex].isFavorite = updatedProduct.isFavorite
                    })
                )
                queryFulfilled.catch(updateProductCard.undo)
            }
        })
    })
})

export const {
    useGetProductCardsQuery, useGetCategoriesQuery,
    useGetSingleCategoryQuery, useGetProductsBySearchQuery,
    useModifyFavoriteMutation
} = productsAPI;