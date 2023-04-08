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

export const loginThunk = createAsyncThunk(
    "profile/login",
    async (loginData: LoginData, { dispatch }) => {
        try {
            dispatch(setPendingState());
            const response = await profileApi.login(loginData);
            dispatch(successAuthorization(response));
        } catch (error) {
            dispatch(authorizationError());
        }
    }
);

export const authThunk = createAsyncThunk("profile/auth", async (_, { dispatch }) => {
    try {
        dispatch(setPendingState());
        const response = await profileApi.me();
        dispatch(successAuthorization(response));
    } catch (error) {
        dispatch(setUnauthorized());
    }
});

export const logoutThunk = createAsyncThunk("profile/logout", async (_, { dispatch }) => {
    try {
        dispatch(setPendingState());
        const response = await profileApi.logout();
        dispatch(logout(response));
    } catch (error) {
        dispatch(authorizationError());
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
            dispatch(authorizationError());
        }
    }
);
