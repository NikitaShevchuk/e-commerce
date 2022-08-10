import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productsAPI} from "../services/productsService";
import filterSlice from "./slices/filterSlice";

const rootReducer = combineReducers({
    filterSlice,
    [productsAPI.reducerPath]: productsAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']