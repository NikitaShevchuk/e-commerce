import { createSlice } from "@reduxjs/toolkit";
import { addNewCartItemBuilder } from "./reducer-map-builder/addNewCartItemBuilder";
import { addToCartBuilder } from "./reducer-map-builder/addToCartBuilder";
import { getCartItemsBuilder } from "./reducer-map-builder/getCartItemsBuilder";
import { modifyCartItemCountBuilder } from "./reducer-map-builder/modifyCartItemCountBuilder";
import { removeCartItemBuilder } from "./reducer-map-builder/removeCartItemBuilder";
import { type LoadingIDs, RequestStatus, type ThunkError } from "./Types";
import { HYDRATE } from "next-redux-wrapper";
import { type CartProduct } from "@/types/CartProduct";

export const cartInitialState = {
    cartItemsCount: 0 as number,
    cartItems: null as CartProduct[] | null,
    status: {
        getCartItems: RequestStatus.loading as RequestStatus,
        addCartItem: RequestStatus.fulfilled as RequestStatus,
        itemsIsUpdating: [] as LoadingIDs,
        itemsIsRemoving: [] as LoadingIDs
    },
    errors: [] as ThunkError[]
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: cartInitialState,
    reducers: {},
    extraReducers: (builder) => {
        addNewCartItemBuilder(builder);
        addToCartBuilder(builder);
        modifyCartItemCountBuilder(builder);
        removeCartItemBuilder(builder);
        getCartItemsBuilder(builder);

        builder.addCase(HYDRATE, (state, action: any) => {
            if (action.payload.cartSlice === undefined) return state;
            return {
                ...state,
                ...action.payload.cartSlice
            };
        });
    }
});

export type CartInitialState = typeof cartInitialState;

export default cartSlice.reducer;
