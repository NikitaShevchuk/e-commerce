import { type RootState } from "../store";

export const getIsAuthorized = (state: RootState) => state.profileSlice.isAuthorized;
export const getIsAuthorizing = (state: RootState) => state.profileSlice.isAuthorizing;
export const getProfile = (state: RootState) => state.profileSlice.profile;
export const getLoginError = (state: RootState) => state.profileSlice.loginError;
export const getInfoMessage = (state: RootState) => state.profileSlice.infoMessage;
