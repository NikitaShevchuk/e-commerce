import { type LoginData, profileApi, type SignUpData } from "@/services/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    authorizationError,
    logout,
    setPendingState,
    setUnauthorized,
    singUp,
    successAuthorization
} from ".";
import { type AxiosError } from "axios";
import { type DefaultResponse } from "@/types/Response";
import { clearCart, setCartItems } from "../cart";

type ProfileError = AxiosError<DefaultResponse<undefined>>;

export const loginThunk = createAsyncThunk(
    "profile/login",
    async (loginData: LoginData, { dispatch }) => {
        try {
            dispatch(setPendingState());
            const response = await profileApi.login(loginData);
            dispatch(successAuthorization(response));
            dispatch(setCartItems(response.data.cart.items));
        } catch (error) {
            const axiosError = error as ProfileError;
            dispatch(authorizationError(axiosError.response?.data));
        }
    }
);

export const authThunk = createAsyncThunk("profile/auth", async (_, { dispatch }) => {
    try {
        dispatch(setPendingState());
        const response = await profileApi.me();
        dispatch(successAuthorization(response));
        dispatch(setCartItems(response.data.cart.items));
    } catch (error) {
        dispatch(setUnauthorized());
    }
});

export const logoutThunk = createAsyncThunk("profile/logout", async (_, { dispatch }) => {
    try {
        dispatch(setPendingState());
        const response = await profileApi.logout();
        dispatch(logout(response));
        dispatch(clearCart());
    } catch (error) {
        const axiosError = error as ProfileError;
        dispatch(authorizationError(axiosError.response?.data));
    }
});

export const signUpThunk = createAsyncThunk(
    "profile/signup",
    async (singUpData: SignUpData, { dispatch }) => {
        try {
            dispatch(setPendingState());
            await profileApi.signup(singUpData);
            dispatch(singUp());
        } catch (error) {
            const axiosError = error as ProfileError;
            dispatch(authorizationError(axiosError.response?.data));
        }
    }
);
