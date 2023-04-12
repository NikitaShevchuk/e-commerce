import { type RootState } from "../store";

export const getFilters = (state: RootState) => state.filterSlice;
