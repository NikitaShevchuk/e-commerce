import { type LoginData, profileApi } from "@/services/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizationError, setPendingState, successAuthorization } from ".";

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
        dispatch(authorizationError());
    }
});
