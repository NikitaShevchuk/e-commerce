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
        price: string
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
        dispatch(setIsCartModalOpened(true))
        const rootState = getState() as RootState
        const {cartItems, cartItemsCount} = cartSelector(rootState)
        const itemIsInCart = cartItems && cartItems.find( item =>
            item.name === selectedCartItem.newCartItem.name &&
            item.size === selectedCartItem.size
        )
        if (itemIsInCart) { // increase the counter if item is already in the cart
            try {
                let itemCount = itemIsInCart.count
                const updatedCartItem: CartProduct = {...itemIsInCart, count: ++itemCount}
                const response = await cartApi.modifyCartItem(updatedCartItem)
                return {response, updatedCartItem}
            } catch (error) {
                const err = error as AxiosError
                return rejectWithValue(err.response?.data)
            }
        } else { // otherwise, if item is not already in cart, add new item to the cart todo refactor
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