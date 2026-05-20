import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PERFUMES, PERFUMES_ID, PERFUMES_FILTER } from "../const";

export const fetchPerfume = createAsyncThunk(
    'perfume/fetchPerfume',
    async ({ page = 1, brandId } = {}, { getState }) => {

        const filters = getState().filters;
        let url = `${PERFUMES}?page=${page}&limit=8&sort=${filters.sort}`

        if (filters.brand) url += `&brand=${filters.brand}`
        if (filters.gender) url += `&gender=${filters.gender}`;
        if (filters.minPrice !== null && filters.minPrice !== "") {
            url += `&minPrice=${filters.minPrice}`;
        }
        if (filters.maxPrice !== null && filters.maxPrice !== "") {
            url += `&maxPrice=${filters.maxPrice}`;
        }
        if (filters.category) {
            url += `&category=${encodeURIComponent(filters.category)}`;
        }
        if (filters.concentration) {
            url += `&concentration=${encodeURIComponent(filters.concentration)}`
        }

        if (filters.notes && filters.notes.length > 0) {
            url += `&notes=${encodeURIComponent(filters.notes.join(','))}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return {
            perfumes: data.perfumes,
            total: data.total,
            totalPages: data.totalPages,
            page: data.page
        };
    }
);

export const fetchFilter = createAsyncThunk(
    'perfume/fetchFilter',
    async () => {
        const response = await fetch(PERFUMES_FILTER)
        const data = await response.json()
        return data
    }
)

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
        singlePerfume: null,
        filters: {
            categories: [],
            notes: [],
            concentration: []
        }
    },
    reducers: {
        clearPerfumes: (state) => {
            state.perfume = []
            state.total = 0
            state.status = 'idle'
        }
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

            .addCase(fetchFilter.fulfilled, (state, action) => {
                state.filters = action.payload;
            })
    }
})
export const { clearPerfumes } = perfumeSlice.actions
export default perfumeSlice.reducer