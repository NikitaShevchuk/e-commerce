import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { addToCart } from "../thunks";
import { findByErrorBody } from "../helpers";
import { ErrorsAlert, RequestStatus, type ThunkError } from "../Types";
import { type CartInitialState } from "../.";

export const addToCartBuilder = (builder: ActionReducerMapBuilder<CartInitialState>) => {
    builder
        .addCase(addToCart.pending, (state) => {
            state.status.addCartItem = RequestStatus.loading;
        })
        .addCase(addToCart.fulfilled, (state) => {
            state.status.addCartItem = RequestStatus.fulfilled;
        })
        .addCase(addToCart.rejected, (state) => {
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
