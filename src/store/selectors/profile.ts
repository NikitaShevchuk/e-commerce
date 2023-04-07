import { type RootState } from "../store";

export const getIsAuthorized = (state: RootState) => state.profileSlice.isAuthorized;
export const getProfile = (state: RootState) => state.profileSlice.profile;
