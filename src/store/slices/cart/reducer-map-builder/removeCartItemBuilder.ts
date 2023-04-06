import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { removeCartItem } from "../cart-thunks";
import { filterByErrorBody } from "../helpers";
import { type CartInitialState, ErrorsAlert, type ThunkError } from "../Types";

export const removeCartItemBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(removeCartItem.pending, (state, action) => {
            state.status.itemsIsRemoving.push(action.meta.arg);
        })
        .addCase(removeCartItem.rejected, (state, action) => {
            if (state.status.itemsIsRemoving[0] !== undefined) {
                state.status.itemsIsRemoving = state.status.itemsIsRemoving.filter(
                    (id) => id !== action.meta.arg // remove item id from array if removing items IDs
                );
            }
            const newError: ThunkError = {
                body: ErrorsAlert.removeCartItem,
                alertType: "error"
            };
            state.errors.push(newError);
        })
        .addCase(removeCartItem.fulfilled, (state, action) => {
            if (state.status.itemsIsRemoving[0] !== undefined) {
                state.status.itemsIsRemoving = state.status.itemsIsRemoving.filter(
                    (id) => id !== action.meta.arg // remove item id from array of items currently being removed
                );
            }
            if (state.errors[0] !== undefined)
                state.errors = state.errors.filter((err) =>
                    filterByErrorBody(err, ErrorsAlert.removeCartItem)
                );
            if (state.cartItems != null) {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.meta.arg);
                --state.cartItemsCount;
            }
        });
};
