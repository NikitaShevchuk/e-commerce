import { createSlice } from "@reduxjs/toolkit";
import { addNewCartItemBuilder } from "./reducer-map-builder/addNewCartItemBuilder";
import { addToCartBuilder } from "./reducer-map-builder/addToCartBuilder";
import { getCartItemsBuilder } from "./reducer-map-builder/getCartItemsBuilder";
import { modifyCartItemCountBuilder } from "./reducer-map-builder/modifyCartItemCountBuilder";
import { removeCartItemBuilder } from "./reducer-map-builder/removeCartItemBuilder";
import { type CartInitialState, RequestStatus } from "./Types";

export const cartInitialState: CartInitialState = {
    isCartModalOpened: false,
    cartItemsCount: 0,
    cartItems: null,
    status: {
        getCartItems: RequestStatus.loading,
        addCartItem: RequestStatus.fulfilled,
        itemsIsUpdating: [],
        itemsIsRemoving: []
    },
    errors: []
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: cartInitialState,
    reducers: {
        setIsCartModalOpened(state, action: { type: string; payload: boolean }) {
            state.isCartModalOpened = action.payload;
        }
    },
    extraReducers: (builder) => {
        addNewCartItemBuilder(builder);
        addToCartBuilder(builder);
        modifyCartItemCountBuilder(builder);
        removeCartItemBuilder(builder);
        getCartItemsBuilder(builder);
    }
});

export const { setIsCartModalOpened } = cartSlice.actions;
export default cartSlice.reducer;
