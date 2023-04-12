import { useTypedSelector } from "@/hooks/redux";
import useUpdateQuery from "@/hooks/query/useUpdateQuery";
import { useGetProductCardsQuery } from "@/services/products";
import { getFilters } from "@/store/selectors/filter";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useRouter } from "next/router";
import React from "react";
import { type ProductsProps } from "../Products";
import { useMapProducts } from "./useMapProducts";

export const useGetProducts = ({ clearSearchRequest = false }: ProductsProps) => {
    const router = useRouter();
    const categoryTitle = router.query.categoryTitle;
    const { requestQuery } = useTypedSelector(getFilters);
    const queryParam = typeof categoryTitle === "string" ? requestQuery : skipToken;

    const isMounted = React.useRef(false);
    useUpdateQuery(isMounted, clearSearchRequest);

    const {
        data: products,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useGetProductCardsQuery(queryParam, { skip: router.isFallback });

    const mappedProducts = useMapProducts(isError, isFetching, products?.data, requestQuery);

    return {
        mappedProducts,
        isError,
        isFetching,
        isLoading,
        refetch
    };
};
