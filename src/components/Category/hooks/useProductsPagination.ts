import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { useGetProductCardsQuery } from "@/services/productsService";
import { getFilters } from "@/store/selectors/filter";
import { setItemsCount } from "@/store/slices/filter";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useRouter } from "next/router";
import React from "react";

export const useProductsPagination = () => {
    const router = useRouter();
    const categoryId = router.query.categoryId;
    const { page, requestQuery, limit } = useTypedSelector(getFilters);

    // TODO change limit to see how many pages to show
    // API doesn't return the amount of products
    const queryParam =
        typeof categoryId === "string"
            ? requestQuery.replace(`p=${page}&l=${limit}`, "p=1&l=999")
            : skipToken;
    const { data: productsArray } = useGetProductCardsQuery(queryParam, {
        skip: router.isFallback
    });

    const dispatch = useTypedDispatch();
    const [pagesCount, setPagesCount] = React.useState(1);
    React.useEffect(() => {
        const amountOfProducts = productsArray != null ? productsArray.data.length : 1;
        const totalPages = Math.ceil(amountOfProducts / limit);
        if (totalPages > 1) setPagesCount(totalPages);
        dispatch(setItemsCount(amountOfProducts));
    }, [productsArray, limit]);

    return {
        pagesCount,
        page
    };
};
