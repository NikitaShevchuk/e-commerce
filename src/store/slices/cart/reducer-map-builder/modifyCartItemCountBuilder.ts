import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { modifyCartItemCount } from "../cart-thunks";
import { type CartInitialState, ErrorsAlert, type ThunkError } from "../Types";

export const modifyCartItemCountBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(modifyCartItemCount.pending, (state, action) => {
            const cartItemId = action.meta.arg.id;
            state.status.itemsIsUpdating.push(cartItemId);
        })
        .addCase(modifyCartItemCount.rejected, (state, action) => {
            if (state.status.itemsIsUpdating[0] !== undefined) {
                state.status.itemsIsUpdating = state.status.itemsIsUpdating.filter(
                    (id) => id !== action.meta.arg.id
                );
            }
            const newError: ThunkError =
                action.payload !== undefined
                    ? { body: action.payload as ErrorsAlert, alertType: "warning" }
                    : { body: ErrorsAlert.modifyCartItemCount, alertType: "warning" };
            if (state.errors.length > 0) state.errors.push(newError);
            else state.errors = [newError];
        })
        .addCase(modifyCartItemCount.fulfilled, (state, action) => {
            if (state.status.itemsIsUpdating[0] !== undefined) {
                state.status.itemsIsUpdating = state.status.itemsIsUpdating.filter(
                    (id) => id !== action.meta.arg.id
                );
            }
            const itemIndex = state.cartItems?.findIndex((item) => item.id === action.meta.arg.id);
            const shouldUpdateItem = itemIndex !== undefined && itemIndex !== -1;
            if (state.cartItems != null && shouldUpdateItem) {
                // remove item modifier error from errors array
                if (state.errors[0] !== undefined)
                    state.errors = state.errors.filter((err) => {
                        return (
                            err.body !== ErrorsAlert.modifyCartItemCount &&
                            err.body !== ErrorsAlert.valueIsNotValid
                        );
                    });
                state.cartItems[itemIndex].count = action.payload.updatedCount;
            } else {
                const newError: ThunkError = {
                    body: ErrorsAlert.modifyCartItemCount,
                    alertType: "warning"
                };
                state.errors.push(newError);
            }
        });
};
