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
    isAuthorizing: false as boolean,
    loginError: null as string | null,
    infoMessage: null as string | null
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        authorizationError(state, action: { payload: DefaultResponse<undefined> | undefined }) {
            state.isAuthorizing = false;
            state.isAuthorized = false;
            const errors = action.payload?.validationErrors;
            if (errors !== undefined) {
                let errorMessage = "";
                errors.forEach(
                    (error) => (errorMessage += `Incorrect data: ${error.value}. ${error.msg}\n`)
                );
                state.loginError = errorMessage;
            } else {
                state.loginError = "Authorization failed.";
            }
            state.profile = profile;
            state.infoMessage = null;
        },
        setUnauthorized(state) {
            state.isAuthorizing = false;
            state.isAuthorized = false;
            state.profile = profile;
            state.infoMessage = null;
        },
        setPendingState(state) {
            state.isAuthorizing = true;
            state.loginError = null;
            state.infoMessage = null;
        },
        successAuthorization(state, action: { payload: DefaultResponse<Profile> }) {
            state.isAuthorizing = false;

            if (!action.payload.success) {
                state.isAuthorized = false;
                state.loginError = action.payload.message ?? "Login failed";
                state.profile = profile;
                return;
            }

            state.isAuthorized = true;
            state.loginError = null;
            state.profile.email = action.payload.data.email;
            state.profile.image = action.payload.data.image;
            state.profile.name = action.payload.data.name;
            state.profile.role = action.payload.data.role;
            state.infoMessage = null;
        },
        logout(state, action: { payload: DefaultResponse<undefined> }) {
            state.isAuthorizing = false;
            if (!action.payload.success || action.payload.isAuthorized === true) {
                state.loginError = "Can not log out";
            }
            state.isAuthorized = false;
            state.profile = profile;
            state.infoMessage = null;
        },
        singUp(state) {
            state.isAuthorizing = false;
            state.loginError = null;
            state.infoMessage = "Successfully registered new account.";
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
