import {createSlice} from "@reduxjs/toolkit";
import {splitByComma} from "./helpers/splitByComma";

export interface Sort {
    property: string | null,
    order: 'asc' | 'desc' | null
}

interface InitialState {
    requestQuery: string
    currentPage: number
    itemsLimit: number
    sizes: string[] | null
    color: string[] | null
    sort: Sort
}

const initialState: InitialState = {
    requestQuery: '',
    itemsLimit: 8,
    currentPage: 1,
    sizes: null,
    color: null,
    sort: {
        property: null,
        order: null
    }
}

const filterSlice = createSlice( {
    name: 'filter',
    initialState,
    reducers: {
        setSize(state, action) {
            if (state.sizes) state.sizes.push(action.payload)
            else state.sizes = [action.payload]
        },
        removeSize(state, action) {
            if (state.sizes) state.sizes = state.sizes.filter( item => item !== action.payload )
        },
        setColor(state, action) {
            if (state.color) state.color.push(action.payload)
            else state.color = [action.payload]
        },
        removeColor(state, action) {
            if (state.color) state.color = state.color.filter( item => item !== action.payload )
        },
        setSort(state, action) {
            state.sort.property = action.payload.property
            state.sort.order = action.payload.order
        },
        setFilters(state, action) {
            state.color = splitByComma(action.payload.color)
            state.sizes = splitByComma(action.payload.sizes)
            if (action.payload.sortBy && action.payload.order) {
                state.sort.property = action.payload.sortBy
                state.sort.order = action.payload.order
            }
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload.currentPage
        },
        setQueryRequest(state, action) {
            state.requestQuery = action.payload
        },
        setItemsLimit(state, action) {
            state.itemsLimit = action.payload.itemsLimit
        }
    }
} )

export const {
    setSize, setSort, setColor, setFilters, removeColor, removeSize, setCurrentPage, setQueryRequest
} = filterSlice.actions
export default filterSlice.reducer