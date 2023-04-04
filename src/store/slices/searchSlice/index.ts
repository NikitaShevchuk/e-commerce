import { createSlice } from "@reduxjs/toolkit";
import { type ICategory } from "../../../types/ICategory";
import { HYDRATE } from "next-redux-wrapper";

interface InitialState {
    isSearchActive: boolean;
    searchRequestText: string | null;
    selectedSearchCategory: ICategory | null;
}

const initialState: InitialState = {
    isSearchActive: false,
    searchRequestText: "",
    selectedSearchCategory: null
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
