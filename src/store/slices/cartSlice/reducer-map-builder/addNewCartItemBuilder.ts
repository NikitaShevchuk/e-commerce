import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { addNewCartItem } from "../cart-thunks";
import { filterByErrorBody, findByErrorBody } from "../helpers";
import { CartInitialState, ErrorsAlert, RequestStatus, ThunkError } from "../Types";

export const addNewCartItemBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(addNewCartItem.fulfilled, (state, action) => {
            if (action.payload.newCartItem) {
                ++state.cartItemsCount;
                if (state.cartItems) state.cartItems.push(action.payload.newCartItem);
                else state.cartItems = [action.payload.newCartItem];
                // remove add to cart error from all errors in state
                const updatedErrors =
                    state.errors &&
                    state.errors.filter((err) => filterByErrorBody(err, ErrorsAlert.addToCart));
                if (updatedErrors) state.errors = updatedErrors;
                state.status.addCartItem = RequestStatus.fulfilled;
            }
        })
        .addCase(addNewCartItem.rejected, (state) => {
            const errorAlreadyExist =
                state.errors &&
                state.errors.find((err) => findByErrorBody(err, ErrorsAlert.addToCart));
            if (!errorAlreadyExist) {
                const error = {
                    body: ErrorsAlert.addToCart,
                    alertType: "error"
                } as ThunkError;
                if (state.errors) state.errors.push(error);
                else state.errors = [error];
            }
            state.status.addCartItem = RequestStatus.error;
        });
};
