import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProductCard} from "../models/IProductCard";
import {ICategory} from "../models/ICategory";

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
        getCategories: build.query<ICategory[], string>({
            query: (params) => ({
                url: `/categories${params}`
            })
        }),
        getSingleCategory: build.query<ICategory,string>({
            query: (categoryId) => ({
                url: `/categories/${categoryId}`
            }),
        }),
        getProductsBySearch: build.query<IProductCard[], string | null>({
            query: (searchRequestText) => ({
                url: `/categories/1/men?search=${searchRequestText}`
            })
        })
    })
})

export const  { useGetProductCardsQuery, useGetCategoriesQuery, useGetSingleCategoryQuery, useGetProductsBySearchQuery } = productsAPI;