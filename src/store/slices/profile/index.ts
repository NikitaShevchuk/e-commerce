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
            state.loginError = "Authorization failed.";
            state.profile = profile;
        },
        setUnauthorized(state) {
            state.isLoading = false;
            state.isAuthorized = false;
            state.profile = profile;
        },
        setPendingState(state) {
            state.isLoading = true;
            state.loginError = null;
        },
        successAuthorization(state, action: { payload: DefaultResponse<Profile> }) {
            state.isLoading = false;

            if (!action.payload.success) {
                state.isAuthorized = false;
                state.loginError = action.payload.message ?? "Login failed";
                state.profile = profile;
                return;
            }

            state.isAuthorized = true;
            state.loginError = null;
            state.profile = action.payload.data;
        },
        logout(state, action: { payload: DefaultResponse<undefined> }) {
            state.isLoading = false;
            if (!action.payload.success || action.payload.isAuthorized === true) {
                state.loginError = "Can not log out";
            }
            state.isAuthorized = false;
            state.profile = profile;
        },
        singUp(state) {
            state.isLoading = false;
            state.loginError = null;
        }
    }
});

export const {
    authorizationError,
    setPendingState,
    successAuthorization,
    logout,
    setUnauthorized,
    singUp
} = profileSlice.actions;
export default profileSlice.reducer;

export type ProfileSliceInitialState = typeof initialState;
export type Profile = typeof profile;
export type Builder = ActionReducerMapBuilder<ProfileSliceInitialState>;
