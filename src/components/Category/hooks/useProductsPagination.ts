import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { useGetProductCardsQuery } from "@/services/productsService";
import { getFilters } from "@/store/selectors/filter";
import { setItemsCount } from "@/store/slices/filterSlice";
import React from "react";

export const useProductsPagination = () => {
    const { currentPage, requestQuery, itemsLimit } = useTypedSelector(getFilters);
    // change limit to see how many pages to show
    // API doesn't return the amount of products
    const { data: productsArray } = useGetProductCardsQuery(
        requestQuery.replace(`p=${currentPage}&l=${itemsLimit}`, "p=1&l=999")
    );
    const dispatch = useTypedDispatch();
    let [pagesCount, setPagesCount] = React.useState(1);
    React.useEffect(() => {
        let amountOfProducts = productsArray ? productsArray.length : 1;
        const totalPages = Math.ceil(amountOfProducts / itemsLimit);
        if (totalPages > 1) setPagesCount(totalPages);
        dispatch(setItemsCount(amountOfProducts));
    }, [productsArray, itemsLimit]);

    return {
        pagesCount,
        currentPage
    };
};
