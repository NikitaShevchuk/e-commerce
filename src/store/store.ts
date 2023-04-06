import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { productsAPI } from "../services/products";
import cartSlice from "./slices/cart";
import filterSlice from "./slices/filter";
import searchSlice from "./slices/search";

const rootReducer = combineReducers({
    filterSlice,
    searchSlice,
    cartSlice,
    [productsAPI.reducerPath]: productsAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(productsAPI.middleware);
        }
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(setupStore);
