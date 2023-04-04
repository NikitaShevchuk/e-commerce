import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { addToCart } from "../cart-thunks";
import { findByErrorBody } from "../helpers";
import { type CartInitialState, ErrorsAlert, RequestStatus, type ThunkError } from "../Types";

export const addToCartBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(addToCart.pending, (state) => {
            state.status.addCartItem = RequestStatus.loading;
        })
        .addCase(addToCart.fulfilled, (state) => {
            state.status.addCartItem = RequestStatus.fulfilled;
        })
        .addCase(addToCart.rejected, (state) => {
            const errorAlreadyExist =
                state.errors &&
                state.errors.find((err) => findByErrorBody(err, ErrorsAlert.addToCart));
            if (errorAlreadyExist == null) {
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
