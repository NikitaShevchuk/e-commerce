import { IProductCard } from "@/models/IProductCard";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CartProduct } from "../../../models/CartProduct";
import { cartApi } from "../../../services/cartService";
import { cartSelector } from "../../selectors/cart";
import { RootState } from "../../store";
import { changeCounter, CounterToChange } from "./helpers";
import { setIsCartModalOpened } from "./index";
import { ErrorsAlert } from "./Types";

export interface SelectedCartItem {
    newCartItem: {
        name: string;
        image: string;
        createdAt: string;
        price: string;
        color: string;
        productId: string;
        categoryId: string;
    };
    size: string;
}

export const getCartItems = createAsyncThunk(
    "cart/getCartItems",
    async (_, { rejectWithValue }) => {
        try {
            return await cartApi.getCart();
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (id: string, { rejectWithValue }) => {
        try {
            return await cartApi.removeItem(id);
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const increaseExistingCartItemCount = async (itemIsInCart: CartProduct) => {
    let itemCount = itemIsInCart.count;
    const updatedCartItem: CartProduct = { ...itemIsInCart, count: ++itemCount };
    const response = await cartApi.modifyCartItem(updatedCartItem);
    return { response, updatedCartItem };
};

const addNewCartItem = async (cartItemsCount: number, selectedCartItem: SelectedCartItem) => {
    let itemsCount = cartItemsCount;
    // set id by cart item order
    let idInPayload = itemsCount > 0 ? String(++itemsCount) : "1";
    const newCartItem: CartProduct = {
        ...selectedCartItem.newCartItem,
        size: selectedCartItem.size,
        id: idInPayload,
        count: 1
    };
    const response = await cartApi.addCartItem(newCartItem);
    return { response, newCartItem };
};

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (selectedCartItem: SelectedCartItem, { getState, dispatch, rejectWithValue }) => {
        dispatch(setIsCartModalOpened(true));
        const rootState = getState() as RootState;
        const { cartItems, cartItemsCount } = cartSelector(rootState);
        const itemIsInCart =
            cartItems &&
            cartItems.find(
                (item) =>
                    item.name === selectedCartItem.newCartItem.name &&
                    item.size === selectedCartItem.size
            );
        try {
            if (itemIsInCart) return await increaseExistingCartItemCount(itemIsInCart);
            else return await addNewCartItem(cartItemsCount, selectedCartItem);
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

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
        try {
            const response = await cartApi.modifyCartItem(updatedCartItem);
            return { response, updatedCount };
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);
