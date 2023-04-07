import { createSlice } from "@reduxjs/toolkit";

const profile = {
    name: null as string | null,
    email: null as string | null,
    image: null as string | null,
    role: null as string | null
};

const initialState = {
    profile,
    isAuthorized: false as boolean
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
    }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;

export type ProfileSliceInitialState = typeof initialState;
export type Profile = typeof profile;
