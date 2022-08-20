import {createSlice} from "@reduxjs/toolkit";

interface InitialState {
    isSearchActive: boolean
    searchRequest: string | null
}

const initialState: InitialState = {
    isSearchActive: false,
    searchRequest: null,
}

export const searchSlice = createSlice( {
    name: 'search',
    initialState,
    reducers: {
        setIsSearchActive(state, action) {
            state.isSearchActive = action.payload
        },
        setSearchRequest(state, action) {
            state.searchRequest = action.payload
        }
    }
} )

export const {setIsSearchActive, setSearchRequest} = searchSlice.actions

export default searchSlice.reducer