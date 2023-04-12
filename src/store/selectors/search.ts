import { type RootState } from "../store";

export const getSearchSlice = (state: RootState) => state.searchSlice;
export const getSearchRequest = (state: RootState) => state.searchSlice.searchRequestText;
