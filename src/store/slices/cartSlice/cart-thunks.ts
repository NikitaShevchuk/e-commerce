import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartProduct } from "../../../types/CartProduct";
import { cartApi } from "../../../services/cartService";
import { cartSelector } from "../../selectors/cart";
import { RootState } from "../../store";
import { changeCounter, CounterToChange } from "./helpers";
import { setIsCartModalOpened } from "./index";
import { CountAction, ErrorsAlert, SelectedCartItem } from "./Types";

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
        const targetItem = cartItems && cartItems.find((item) => item.id === counterToChange.id);
        if (!targetItem) return rejectWithValue(ErrorsAlert.modifyCartItemCount);
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
        let idInPayload = itemsCount > 0 ? String(++itemsCount) : "1";
        const newCartItem: CartProduct = {
            ...itemWithNewCounter.selectedCartItem.newCartItem,
            size: itemWithNewCounter.selectedCartItem.size,
            id: idInPayload,
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
        dispatch(setIsCartModalOpened(true));
        const rootState = getState() as RootState;
        const { cartItems, cartItemsCount } = cartSelector(rootState);
        const existingProductInCart = cartItems && cartItems.find(findItemInCart(selectedCartItem));
        if (existingProductInCart) {
            return await dispatch(
                modifyCartItemCount({
                    id: existingProductInCart.id,
                    countAction: CountAction.increase
                })
            );
        } else {
            return await dispatch(addNewCartItem({ cartItemsCount, selectedCartItem }));
        }
    }
);
