import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PERFUMES, PERFUMES_ID } from "../const";

export const fetchPerfume = createAsyncThunk(
    'perfume/fetchPerfume',
    async (page = 1) => {
        const response = await fetch(`${PERFUMES}?page=${page}&limit=8`);
        const data = await response.json();
        return {
            perfumes: data.perfumes,
            total: data.total,
            totalPages: data.totalPages,
            page: data.page
        };
    }
);
export const fetchPerfumeID = createAsyncThunk(
    'perfume/fetchPerfumeID',
    async (id) => {
        const response = await fetch(PERFUMES_ID(id))
        const data = await response.json()
        return data
    }
)

const perfumeSlice = createSlice({
    name: 'perfume',
    initialState: {
        status: 'idle',
        error: null,
        perfume: [],
        total: 0,
        page: 1,
        totalPages: 0,
        singlePerfume: null
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPerfume.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPerfume.fulfilled, (state, action) => {
                state.status = 'success';
                state.perfume = action.payload.perfumes;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.page;
            })
            .addCase(fetchPerfume.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(fetchPerfumeID.pending, (state) => {
                state.status = 'loading';
                state.singlePerfume = null;
            })
            .addCase(fetchPerfumeID.fulfilled, (state, action) => {
                state.singlePerfume = action.payload
            })
            .addCase(fetchPerfumeID.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default perfumeSlice.reducer