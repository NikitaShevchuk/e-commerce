import { createSlice } from "@reduxjs/toolkit";
import { splitByComma } from "./helpers/splitByComma";

export interface Sort {
    property: string | null;
    order: "asc" | "desc" | null;
}

interface InitialState {
    requestQuery: string;
    currentPage: number;
    itemsLimit: number;
    itemsCount: number;
    sizes: string[] | null;
    color: string[] | null;
    sort: Sort;
}

const initialState: InitialState = {
    requestQuery: "",
    itemsLimit: 8,
    currentPage: 1,
    sizes: null,
    color: null,
    itemsCount: 0,
    sort: {
        property: null,
        order: null
    }
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
            state.sort.property = action.payload.property;
            state.sort.order = action.payload.order;
        },
        setFilters(state, action) {
            if (action.payload.color) state.color = splitByComma(action.payload.color);
            if (action.payload.sizes) state.sizes = splitByComma(action.payload.sizes);
            if (action.payload.page) state.currentPage = action.payload.page;
            if (action.payload.limit) state.itemsLimit = action.payload.limit;
            if (action.payload.sortBy && action.payload.order) {
                state.sort.property = action.payload.sortBy;
                state.sort.order = action.payload.order;
            }
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setQueryRequest(state, action) {
            state.requestQuery = action.payload;
        },
        setItemsLimit(state, action) {
            state.itemsLimit = action.payload;
        },
        setItemsCount(state, action) {
            state.itemsCount = action.payload;
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
    setItemsLimit
} = filterSlice.actions;
export default filterSlice.reducer;
