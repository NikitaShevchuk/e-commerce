import type { FilterSliceInitialState } from "@/store/slices/filterSlice";
import qs from "qs";

export const getQuery = (filters: FilterSliceInitialState): string => {
    const query = {
        sizes: filters.sizes,
        color: filters.color,
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sort.property,
        order: filters.sort.order,
        categoryId: filters.categoryId
    };
    return qs.stringify(query, { skipNulls: true, arrayFormat: "comma" });
};
