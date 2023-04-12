import { createSlice } from "@reduxjs/toolkit";
import { splitByComma } from "./helpers/splitByComma";
import { HYDRATE } from "next-redux-wrapper";

export interface Sort {
    property: string | null;
    order: "asc" | "desc" | null;
}

const initialState = {
    requestQuery: "" as string,
    limit: "8" as string,
    page: "1" as string,
    categoryId: null as string | null,
    sizes: null as string[] | null,
    color: null as string[] | null,
    itemsCount: 0 as number,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    sort: {
        property: null,
        order: null
    } as any
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSize(state, action) {
            if (state.sizes != null) state.sizes.push(action.payload);
            else state.sizes = [action.payload];
        },
        removeSize(state, action) {
            if (state.sizes != null)
                state.sizes = state.sizes.filter((item) => item !== action.payload);
        },
        setColor(state, action) {
            if (state.color != null) state.color.push(action.payload);
            else state.color = [action.payload];
        },
        removeColor(state, action) {
            if (state.color != null)
                state.color = state.color.filter((item) => item !== action.payload);
        },
        setSort(state, action) {
            // state.sort.property = action.payload.property;
            // state.sort.order = action.payload.order;
        },
        setFilters(state, action) {
            if (action.payload.color !== undefined)
                state.color = splitByComma(action.payload.color);
            if (action.payload.sizes !== undefined)
                state.sizes = splitByComma(action.payload.sizes);
            if (action.payload.page !== undefined) state.page = action.payload.page;
            if (action.payload.limit !== undefined) state.limit = action.payload.limit;
            if (action.payload.sortBy !== undefined && action.payload.order !== undefined) {
                state.sort.property = action.payload.sortBy;
                state.sort.order = action.payload.order;
            }
        },
        setCurrentPage(state, action: { payload: string }) {
            state.page = action.payload;
        },
        setCategoryId(state, action: { payload: string }) {
            state.categoryId = action.payload;
        },
        setQueryRequest(state, action: { payload: string }) {
            let newRequestQuery = action.payload;
            if (state.categoryId !== null) {
                newRequestQuery.includes("?")
                    ? (newRequestQuery += `&categoryId=${state.categoryId}`)
                    : (newRequestQuery = `?categoryId=${state.categoryId}`);
            }
            state.requestQuery = newRequestQuery;
        },
        setItemsLimit(state, action) {
            state.limit = action.payload;
        },
        setItemsCount(state, action) {
            state.itemsCount = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.filterSlice
            };
        }
    }
});

export const {
    setSize,
    setSort,
    setColor,
    setFilters,
    removeColor,
    removeSize,
    setCurrentPage,
    setQueryRequest,
    setItemsCount,
    setItemsLimit,
    setCategoryId
} = filterSlice.actions;
export default filterSlice.reducer;

export type FilterSliceInitialState = typeof initialState;
