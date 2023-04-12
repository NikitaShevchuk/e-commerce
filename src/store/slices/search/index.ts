import { createSlice } from "@reduxjs/toolkit";
import { type ICategory } from "../../../types/ICategory";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    isSearchActive: false as boolean,
    searchRequestText: "" as string | null,
    selectedSearchCategory: null as ICategory | null
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setIsSearchActive(state, action: { payload: boolean }) {
            state.isSearchActive = action.payload;
        },
        setSearchRequest(state, action: { payload: string | null }) {
            if (action.payload !== null) state.searchRequestText = action.payload;
        },
        setSelectedCategory(state, action: { payload: ICategory | null }) {
            state.selectedSearchCategory = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.searchSlice
            };
        }
    }
});

export const { setIsSearchActive, setSearchRequest, setSelectedCategory } = searchSlice.actions;

export default searchSlice.reducer;
