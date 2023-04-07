import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null as string | null,
    email: null as string | null,
    image: null as string | null
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action) {}
    }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;

export type ProfileSliceInitialState = typeof initialState;
