import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { addNewCartItem } from "../cart-thunks";
import { filterByErrorBody, findByErrorBody } from "../helpers";
import { type CartInitialState, ErrorsAlert, RequestStatus, type ThunkError } from "../Types";

export const addNewCartItemBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(addNewCartItem.fulfilled, (state, action) => {
            if (action.payload.newCartItem !== undefined) {
                ++state.cartItemsCount;
                if (state.cartItems != null) state.cartItems.push(action.payload.newCartItem);
                else state.cartItems = [action.payload.newCartItem];
                // remove add to cart error from all errors in state
                const updatedErrors = state.errors?.filter((err) =>
                    filterByErrorBody(err, ErrorsAlert.addToCart)
                );
                if (updatedErrors.length > 0) state.errors = updatedErrors;
                state.status.addCartItem = RequestStatus.fulfilled;
            }
        })
        .addCase(addNewCartItem.rejected, (state) => {
            const errorAlreadyExist = state.errors?.find((err) =>
                findByErrorBody(err, ErrorsAlert.addToCart)
            );
            if (errorAlreadyExist == null) {
                const error = {
                    body: ErrorsAlert.addToCart,
                    alertType: "error"
                } as ThunkError;
                if (state.errors.length > 0) state.errors.push(error);
                else state.errors = [error];
            }
            state.status.addCartItem = RequestStatus.error;
        });
};
