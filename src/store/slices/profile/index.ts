import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./thunks";

const profile = {
    name: null as string | null,
    email: null as string | null,
    image: null as string | null,
    role: null as string | null
};

const initialState = {
    profile,
    isAuthorized: false as boolean,
    isLoading: false as boolean,
    loginError: null as string | null
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action: { payload: Profile }) {
            state.profile = action.payload;
        },
        setIsAuthorized(state, action: { payload: boolean }) {
            state.isAuthorized = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.rejected, (state) => {
            state.isLoading = false;
            state.isAuthorized = false;
            state.loginError = "Please check your internet connection.";
            state.profile = profile;
        });
        builder.addCase(loginThunk.pending, (state) => {
            state.isLoading = true;
            state.loginError = null;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.isLoading = false;

            const loginFailed =
                !action.payload.success ||
                action.payload.isAuthorized === undefined ||
                !action.payload.isAuthorized;
            if (loginFailed) {
                state.isAuthorized = false;
                state.loginError = action.payload.message ?? "Login failed";
                state.profile = profile;
            }

            state.isAuthorized = true;
            state.loginError = null;
            state.profile = action.payload.data;
        });
    }
});

export const { setProfile, setIsAuthorized } = profileSlice.actions;
export default profileSlice.reducer;

export type ProfileSliceInitialState = typeof initialState;
export type Profile = typeof profile;
