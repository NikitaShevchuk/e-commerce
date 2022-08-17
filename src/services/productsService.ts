import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProductCard} from "../models/IProductCard";
import {ICategories} from "../models/ICategories";

export const API_URL = 'https://62d8405090883139358e3103.mockapi.io'

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getProductCards: build.query<IProductCard[], string>({
            query: (params) => ({
                url: `/categories/${params}`
            })
        }),
        getCategories: build.query<ICategories[], string>({
            query: (params) => ({
                url: `/categories${params}`
            })
        }),
        getSingleCategory: build.query<ICategories, string>({
            query: (categoryId) => ({
                url: `/categories/${categoryId}`
            })
        }),
    })
})

export const  { useGetProductCardsQuery, useGetCategoriesQuery, useGetSingleCategoryQuery } = productsAPI;