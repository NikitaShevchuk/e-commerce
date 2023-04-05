import type { FilterSliceInitialState } from "@/store/slices/filterSlice";
import qs from "qs";

export const getQuery = (filters: FilterSliceInitialState): string => {
    const query: any = {
        sizes: filters.sizes,
        color: filters.color,
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sort.property,
        order: filters.sort.order
    };
    return qs.stringify(query, { skipNulls: true, arrayFormat: "comma" });
};
