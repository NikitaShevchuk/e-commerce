import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartProduct } from "../../../types/CartProduct";
import { cartApi } from "../../../services/cart";
import { cartSelector } from "../../selectors/cart";
import { type RootState } from "../../store";
import { changeCounter, type CounterToChange } from "./helpers";
import { CountAction, ErrorsAlert, type SelectedCartItem } from "./Types";

export const getCartItems = createAsyncThunk("cart/getCartItems", async (_) => {
    return await cartApi.getCart();
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (id: string) => {
    return await cartApi.removeItem(id);
});

export const modifyCartItemCount = createAsyncThunk(
    "cart/modifyCartItemCount",
    async (counterToChange: CounterToChange, { getState, rejectWithValue }) => {
        const rootState = getState() as RootState;
        const cartItems = cartSelector(rootState).cartItems;
        const targetItem = cartItems?.find((item) => item._id === counterToChange._id);
        if (targetItem === undefined) return rejectWithValue(ErrorsAlert.modifyCartItemCount);
        const updatedCount = changeCounter(targetItem.count, counterToChange);
        if (updatedCount === 0) {
            return rejectWithValue(ErrorsAlert.valueIsNotValid);
        }
        const updatedCartItem: CartProduct = { ...targetItem, count: updatedCount };
        const response = await cartApi.modifyCartItem(updatedCartItem);
        return { response, updatedCount };
    }
);

interface itemWithNewCounter {
    cartItemsCount: number;
    selectedCartItem: SelectedCartItem;
}

export const addNewCartItem = createAsyncThunk(
    "cart/addNewCartItem",
    async (itemWithNewCounter: itemWithNewCounter) => {
        let itemsCount = itemWithNewCounter.cartItemsCount;
        // set id by cart item order
        const idInPayload = itemsCount > 0 ? String(++itemsCount) : "1";
        const newCartItem: CartProduct = {
            ...itemWithNewCounter.selectedCartItem.newCartItem,
            size: itemWithNewCounter.selectedCartItem.size,
            _id: idInPayload,
            count: 1
        };
        const response = await cartApi.addCartItem(newCartItem);
        return { response, newCartItem };
    }
);

const findItemInCart = (selectedCartItem: SelectedCartItem) => (item: CartProduct) =>
    item.name === selectedCartItem.newCartItem.name && item.size === selectedCartItem.size;

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (selectedCartItem: SelectedCartItem, { getState, dispatch }) => {
        const rootState = getState() as RootState;
        const { cartItems, cartItemsCount } = cartSelector(rootState);
        const existingProductInCart = cartItems?.find(findItemInCart(selectedCartItem));
        if (existingProductInCart != null) {
            return await dispatch(
                modifyCartItemCount({
                    _id: existingProductInCart._id,
                    countAction: CountAction.increase
                })
            );
        } else {
            return await dispatch(addNewCartItem({ cartItemsCount, selectedCartItem }));
        }
    }
);
