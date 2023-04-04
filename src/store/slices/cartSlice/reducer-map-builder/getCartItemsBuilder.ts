import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getCartItems } from "../cart-thunks";
import { type CartInitialState, RequestStatus, type ThunkError } from "../Types";

export const getCartItemsBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(getCartItems.pending, (state) => {
            state.cartItems = null;
            state.status.getCartItems = RequestStatus.loading;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.cartItemsCount = action.payload.length > 0 ? action.payload.length : 0;
            state.errors = [];
            state.status.getCartItems = RequestStatus.fulfilled;
        })
        .addCase(getCartItems.rejected, (state, action) => {
            state.cartItems = null;
            const newError: ThunkError = { body: action.payload as string, alertType: "error" };
            if (state.errors.length > 0) state.errors.push(newError);
            else state.errors = [newError];
            state.status.getCartItems = RequestStatus.error;
        });
};
