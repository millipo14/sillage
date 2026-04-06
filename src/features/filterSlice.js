import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        brand: null,
        gender: null,
        minPrice: null,
        maxPrice: null,
        notes: [],
        category: null,
        concentration: null,
        sort: 'popularity'
    },
    reducers: {
        setBrand: (state, action) => {
            state.brand = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setPrice: (state, action) => {
            state.minPrice = action.payload.min;
            state.maxPrice = action.payload.max;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setConcentration: (state, action) => {
            state.concentration = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        resetFilters: (state) => {
            state.brand = null;
            state.gender = null;
            state.minPrice = null;
            state.maxPrice = null;
            state.notes = [];
            state.category = null;
            state.concentration = null;
            state.sort = 'popularity'
        }
    }
});

export const {
    setBrand,
    setGender,
    setPrice,
    setNotes,
    setCategory,
    setConcentration,
    setSort,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;