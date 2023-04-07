import { type RootState } from "../store";

export const getIsAuthorized = (state: RootState) => state.profileSlice.isAuthorized;
export const getIsLoading = (state: RootState) => state.profileSlice.isLoading;
export const getProfile = (state: RootState) => state.profileSlice.profile;
export const getLoginError = (state: RootState) => state.profileSlice.loginError;
