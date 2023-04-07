import { type DefaultResponse } from "@/types/Response";
import { type ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

export const profile = {
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
        authorizationError(state) {
            state.isLoading = false;
            state.isAuthorized = false;
            state.loginError = "Please check your internet connection.";
            state.profile = profile;
        },
        setPendingState(state) {
            state.isLoading = true;
            state.loginError = null;
        },
        successAuthorization(state, action: { payload: DefaultResponse<Profile> }) {
            state.isLoading = false;

            const authorizationFailed =
                !action.payload.success ||
                action.payload.isAuthorized === undefined ||
                !action.payload.isAuthorized;
            if (authorizationFailed) {
                state.isAuthorized = false;
                state.loginError = action.payload.message ?? "Login failed";
                state.profile = profile;
                return;
            }

            state.isAuthorized = true;
            state.loginError = null;
            state.profile = action.payload.data;
        }
    }
});

export const { authorizationError, setPendingState, successAuthorization } = profileSlice.actions;
export default profileSlice.reducer;

export type ProfileSliceInitialState = typeof initialState;
export type Profile = typeof profile;
export type Builder = ActionReducerMapBuilder<ProfileSliceInitialState>;
