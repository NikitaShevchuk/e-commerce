import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsAPI } from "../services/productsService";
import filterSlice from "./slices/filterSlice";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";

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
