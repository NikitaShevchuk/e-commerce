import {createAsyncThunk} from "@reduxjs/toolkit";
import {cartApi} from "../../../services/cartService";
import {RootState} from "../../store";
import {cartSelector} from "../../selectors/cart";
import {ErrorsAlert, setIsCartModalOpened} from "./index";
import {AxiosError} from 'axios'
import {CartProduct} from "../../../models/CartProduct";
import {changeCounter, CounterToChange} from "./helpers";

export interface SelectedCartItem {
    newCartItem: {
        name: string
        image: string
        createdAt: string
        price: number
        color: string
    },
    size: string
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, {rejectWithValue}) => {
        try {
            return await cartApi.getCart()
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async (id: string, {rejectWithValue}) => {
        try {
            return await cartApi.removeItem(id)
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (selectedCartItem: SelectedCartItem, {getState, dispatch, rejectWithValue}) => {
        const rootState = getState() as RootState
        const {cartItems, cartItemsCount} = cartSelector(rootState)
        const itemInCart = cartItems && cartItems.find( item =>
            item.name === selectedCartItem.newCartItem.name &&
            item.size === selectedCartItem.size
        )
        dispatch(setIsCartModalOpened(true))
        if (itemInCart) { // increase the counter if item is already in the cart
            try {
                let itemCount = itemInCart.count
                const updatedCartItem: CartProduct = {...itemInCart, count: ++itemCount}
                const response = await cartApi.modifyCartItem(updatedCartItem)
                return {response, updatedCartItem}
            } catch (error) {
                const err = error as AxiosError
                return rejectWithValue(err.response?.data)
            }
        } else { // otherwise, if item is not already in cart, add new item to the cart
            try {
                let itemsCount = cartItemsCount
                // set id by cart item order
                let idInPayload = itemsCount > 0 ? String(++itemsCount) : '1'
                const newCartItem: CartProduct = {
                    ...selectedCartItem.newCartItem,
                    size: selectedCartItem.size,
                    id: idInPayload,
                    count: 1
                }
                const response = await cartApi.addCartItem(newCartItem)
                return {response, newCartItem}
            } catch (error) {
                const err = error as AxiosError
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const modifyCartItemCount = createAsyncThunk(
    'cart/modifyCartItemCount',
    async (counterToChange: CounterToChange,{getState, rejectWithValue}) => {
        const rootState = getState() as RootState
        const cartItems = cartSelector(rootState).cartItems
        const targetItem = cartItems && cartItems.find(
            item => item.id === counterToChange.id
        )
        if (!targetItem) return rejectWithValue(ErrorsAlert.modifyCartItemCount)
        const updatedCount = changeCounter(targetItem.count, counterToChange)
        if (updatedCount === 0 ) {
            return rejectWithValue(ErrorsAlert.valueIsNotValid)
        }
        const updatedCartItem: CartProduct = {...targetItem, count: updatedCount}
        try {
            const response = await cartApi.modifyCartItem(updatedCartItem)
            return {response, updatedCount}
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)