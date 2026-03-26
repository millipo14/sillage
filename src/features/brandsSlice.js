import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BRANDS, BRANDS_ID } from "../const";


export const fetchBrands = createAsyncThunk(
    'brands/fetchBrands',
    async () => {
        const response = await fetch(BRANDS)
        const data = await response.json()
        return data
    }
)

export const fetchBrandsID = createAsyncThunk(
    'brands/fetchBrandsID',
    async (id) => {
        const response = await fetch(BRANDS_ID(id))
        const data = await response.json()
        return data
    }
)

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        status: 'idle',
        error: null,
        brands: [],
        singleBrand: null,
    },

    extraReducers: builder => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.status = 'success';
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(fetchBrandsID.pending, (state) => {
                state.status = 'loading';
                state.singleBrand = null;
            })
            .addCase(fetchBrandsID.fulfilled, (state, action) => {
                state.singleBrand = action.payload
            })
            .addCase(fetchBrandsID.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default brandsSlice.reducer