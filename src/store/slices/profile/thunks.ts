import { type LoginData, profileApi } from "@/services/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk("profile/login", async (loginData: LoginData) => {
    return await profileApi.login(loginData);
});
