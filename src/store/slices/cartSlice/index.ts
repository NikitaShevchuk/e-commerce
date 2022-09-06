import {createSlice} from "@reduxjs/toolkit";
import {addToCart, getCartItems, modifyCartItemCount, removeCartItem} from "./cartThunk";
import {CartProduct} from "../../../models/CartProduct";
import {filterByErrorBody, findByErrorBody} from "./helpers";

export enum RequestStatus {
    loading = 'loading',
    error = 'error',
    fulfilled = 'fulfilled'
}

export interface ThunkError {
    body: string
    alertType: 'warning' | 'error'
}

export enum ErrorsAlert {
    addToCart = "Can't add item to cart",
    modifyCartItemCount = "Over rate limit",
    removeCartItem = "Can't remove product from cart",
    getCartItems= "Can't load your shopping cart",
    valueIsNotValid = 'Please enter valid number no greater than 10'
}


export type LoadingIDs = string[]

export interface CartInitialState {
    isCartModalOpened: boolean
    cartItemsCount: number
    cartItems: CartProduct[] | null,
    status: {
        getCartItems: RequestStatus
        addCartItem: RequestStatus
        itemsIsRemoving: LoadingIDs
        itemsIsUpdating: LoadingIDs
    },
    errors: ThunkError[] | null
}

const initialState: CartInitialState = {
    isCartModalOpened: false,
    cartItemsCount: 0,
    cartItems: null,
    status: {
        getCartItems: RequestStatus.loading,
        addCartItem: RequestStatus.fulfilled,
        itemsIsUpdating: [],
        itemsIsRemoving: []
    },
    errors: null
}

export enum CountAction {
    increase = 'increase',
    decrease = 'decrease',
    replace = 'replace'
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setIsCartModalOpened(state, action: {type: string, payload: boolean}) {
            state.isCartModalOpened = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.cartItems = null
            state.status.getCartItems = RequestStatus.loading
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload
            state.cartItemsCount = action.payload ? action.payload.length : 0
            state.errors = null
            state.status.getCartItems = RequestStatus.fulfilled
        })
        .addCase(getCartItems.rejected, (state, action) => {
            state.cartItems = null
            const newError: ThunkError = {body: action.payload as string, alertType: 'error'}
            if (state.errors) state.errors.push(newError)
            else state.errors = [newError]
            state.status.getCartItems = RequestStatus.error
        })
        .addCase(addToCart.pending, (state) => {
            state.status.addCartItem = RequestStatus.loading
        })
        .addCase(addToCart.rejected, (state) => {
            const newError: ThunkError = {body: ErrorsAlert.addToCart, alertType: 'error'}
            if (state.errors) state.errors.push(newError)
            else state.errors = [newError]
            state.status.addCartItem = RequestStatus.error
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            if (action.payload.newCartItem) {
                ++state.cartItemsCount
                if (state.cartItems) state.cartItems.push(action.payload.newCartItem)
                else state.cartItems = [action.payload.newCartItem]
                // remove add to cart error from all errors in state
                const updatedErrors = state.errors && state.errors.filter(
                    (err) => filterByErrorBody(err, ErrorsAlert.addToCart)
                )
                if (updatedErrors) state.errors = updatedErrors
                state.status.addCartItem = RequestStatus.fulfilled
            } else if (action.payload.updatedCartItem) {
                const itemIndex = state.cartItems && state.cartItems.findIndex(
                    item => {
                        if (action.payload.updatedCartItem) return item.id === action.payload.updatedCartItem.id
                        else return false
                    }
                )
                const shouldUpdateItem = itemIndex !== null && itemIndex !== -1
                if (state.cartItems && shouldUpdateItem) {
                    // remove item modifier error from errors array
                    if (state.errors) state.errors = state.errors.filter(
                        (err) => {
                            return filterByErrorBody(err, ErrorsAlert.modifyCartItemCount)
                        }
                    )
                    state.cartItems[itemIndex].count = action.payload.updatedCartItem.count
                }
                const updatedErrors = state.errors && state.errors.filter(
                    (err) => filterByErrorBody(err, ErrorsAlert.addToCart)
                )
                if (updatedErrors) state.errors = updatedErrors
                state.status.addCartItem = RequestStatus.fulfilled
            } else {
                const errorAlreadyExist = state.errors && state.errors.find(
                    (err) => findByErrorBody(err, ErrorsAlert.addToCart)
                )
                if (!errorAlreadyExist) {
                    const error = {
                        body: ErrorsAlert.addToCart,
                        alertType: 'error'
                    } as ThunkError
                    if (state.errors) state.errors.push(error)
                    else state.errors = [error]
                }
                state.status.addCartItem = RequestStatus.error
            }
        })
        .addCase(modifyCartItemCount.pending, (state, action) => {
            const cartItemId = action.meta.arg.id
            state.status.itemsIsUpdating.push(cartItemId)
        })
        .addCase(modifyCartItemCount.rejected, (state, action) => {
            if (state.status.itemsIsUpdating[0]) {
                state.status.itemsIsUpdating = state.status.itemsIsUpdating.filter(
                    id => id !== action.meta.arg.id
                )
            }
            const newError: ThunkError =  action.payload
                ? {body: action.payload as ErrorsAlert, alertType: 'warning'}
                : {body: ErrorsAlert.modifyCartItemCount, alertType: 'warning'}
            if (state.errors) state.errors.push(newError)
            else state.errors = [newError]
        })
        .addCase(modifyCartItemCount.fulfilled, (state, action) => {
            if (state.status.itemsIsUpdating[0]) {
                state.status.itemsIsUpdating = state.status.itemsIsUpdating.filter(
                    id => id !== action.meta.arg.id
                )
            }
            const itemIndex = state.cartItems && state.cartItems.findIndex(
                item => item.id === action.meta.arg.id
            )
            const shouldUpdateItem = itemIndex !== null && itemIndex !== -1
            if (state.cartItems && shouldUpdateItem) {
                // remove item modifier error from errors array
                if (state.errors) state.errors = state.errors.filter(
                    err => {
                        return err.body !== ErrorsAlert.modifyCartItemCount
                            && err.body !== ErrorsAlert.valueIsNotValid
                    }
                )
                state.cartItems[itemIndex].count = action.payload.updatedCount
            } else {
                const newError: ThunkError = {body: ErrorsAlert.modifyCartItemCount, alertType: 'warning'}
                if (state.errors) state.errors.push(newError)
                else state.errors = [newError]
            }
        })
        .addCase(removeCartItem.pending, (state, action) => {
            if (state.status.itemsIsRemoving) state.status.itemsIsRemoving.push(action.meta.arg)
            else state.status.itemsIsRemoving = [action.meta.arg]
        })
        .addCase(removeCartItem.rejected, (state, action) => {
            if (state.status.itemsIsRemoving) {
                state.status.itemsIsRemoving = state.status.itemsIsRemoving.filter(
                    id => id !== action.meta.arg // remove item id from array if removing items IDs
                )
            }
            const newError: ThunkError = {body: ErrorsAlert.removeCartItem, alertType: 'error'}
            if (state.errors) state.errors.push(newError)
            else state.errors = [newError]
        })
        .addCase(removeCartItem.fulfilled, (state, action) => {
            if (state.status.itemsIsRemoving) {
                state.status.itemsIsRemoving = state.status.itemsIsRemoving.filter(
                    id => id !== action.meta.arg // remove item id from array of items currently being removed
                )
            }
            if (state.errors) state.errors = state.errors.filter(
                err => filterByErrorBody(err, ErrorsAlert.removeCartItem)
            )
            if (state.cartItems) {
                state.cartItems = state.cartItems.filter(
                    item => item.id !== action.meta.arg
                )
                --state.cartItemsCount
            }
        })
    }
})

export const {setIsCartModalOpened} = cartSlice.actions
export default cartSlice.reducer