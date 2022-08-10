import {createSlice} from "@reduxjs/toolkit";

interface InitialState {
    sizes: string[] | null
    color: string[] | null
    sort: {
        sortName: string,
        order: 'asc' | 'desc'
    }
}

const initialState: InitialState = {
    sizes: null,
    color: null,
    sort: {
        sortName: 'createdAt',
        order: 'asc'
    }
}

const filterSlice = createSlice( {
    name: 'filter',
    initialState,
    reducers: {
        setSize(state, action) {
            state.sizes += state.sizes ? ` ${action.payload}` : action.payload
        },
        setColor(state, action) {
            state.color = action.payload
        },
        setSort(state, action) {
            state.sort.sortName = action.payload.sortName
            state.sort.order = action.payload.order
        },
        setFilters(state, action) {
            state.sizes = action.payload.sizes
            state.color = action.payload.colors
            state.sort = {
                sortName: action.payload.sortName,
                order: action.payload.order
            }
        }
    }
} )

export const {setSize, setSort, setColor, setFilters} = filterSlice.actions
export default filterSlice.reducer