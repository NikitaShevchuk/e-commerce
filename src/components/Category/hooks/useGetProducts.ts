import { useTypedSelector } from "@/hooks/redux";
import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useGetProductCardsQuery } from "@/services/productsService";
import { getFilters } from "@/store/selectors/filter";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useRouter } from "next/router";
import React from "react";
import { type ProductsProps } from "../Products";
import { useMapProducts } from "./useMapProducts";

export const useGetProducts = ({ clearSearchRequest = false }: ProductsProps) => {
    const router = useRouter();
    const categoryId = router.query.categoryId;
    const { requestQuery } = useTypedSelector(getFilters);
    const queryParam = typeof categoryId === "string" ? requestQuery : skipToken;

    const isMounted = React.useRef(false);
    useUpdateQuery(categoryId, isMounted, clearSearchRequest);

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
