import { createSlice } from "@reduxjs/toolkit";
import {
    addNewCartItemBuilder,
    addToCartBuilder,
    modifyCartItemCountBuilder,
    removeCartItemBuilder
} from "./reducer-map-builder";
import { RequestStatus, type ThunkError } from "./Types";
import { HYDRATE } from "next-redux-wrapper";
import { type IProductCard } from "@/types/IProductCard";

const defaultStatus = {
    getCartItems: RequestStatus.loading as RequestStatus,
    addCartItem: RequestStatus.fulfilled as RequestStatus,
    itemsIsUpdating: [] as string[],
    itemsIsRemoving: [] as string[]
};

export const cartInitialState = {
    cartItems: null as IProductCard[] | null,
    status: defaultStatus,
    errors: [] as ThunkError[]
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: cartInitialState,
    reducers: {
        setCartItems(state, action: { payload: IProductCard[] }) {
            state.cartItems = action.payload;
        },
        clearCart(state) {
            state.cartItems = null;
            state.status = defaultStatus;
            state.errors = [];
        }
    },
    extraReducers: (builder) => {
        addNewCartItemBuilder(builder);
        addToCartBuilder(builder);
        modifyCartItemCountBuilder(builder);
        removeCartItemBuilder(builder);

        builder.addCase(HYDRATE, (state, action: any) => {
            if (action.payload.cartSlice === undefined) return state;
            return {
                ...state,
                ...action.payload.cartSlice
            };
        });
    }
});

export const { setCartItems } = cartSlice.actions;

export type CartInitialState = typeof cartInitialState;

export default cartSlice.reducer;
