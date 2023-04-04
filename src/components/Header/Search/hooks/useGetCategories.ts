import { useGetCategoriesQuery } from "@/services/productsService";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useRouter } from "next/router";

export const useGetCategories = () => {
    const router = useRouter();
    const queryParam = router.query !== undefined ? "" : skipToken;
    return useGetCategoriesQuery(queryParam, { skip: router.isFallback });
};
