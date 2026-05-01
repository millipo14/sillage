import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REVIEWS, REVIEWS_CREATE } from "../const";


export const fetchReview = createAsyncThunk(
    'reviews/fetchReview',
    async (perfumeId) => {
        const response = await fetch(REVIEWS(perfumeId))
        return await response.json()
    }
)

export const fetchReviewUser = createAsyncThunk(
    'reviews/fetchReviewUser',
    async (reviewUser) => {
        const response = await fetch(REVIEWS_CREATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(reviewUser)
        })
        return await response.json()
    }
)


const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        averageRating: 0,
        total: 0,
        ratingBar: [],
        reviewUser: null,
        status: 'idle',
        error: null
    },
    extraReducers: builder => {
        builder
            .addCase(fetchReview.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.status = 'success'
                state.reviews = action.payload.reviews
                state.averageRating = action.payload.averageRating
                    ? Number(action.payload.averageRating).toFixed(1)
                    : 0
                state.total = action.payload.total
                state.ratingBar = action.payload.ratingBar
            })
            .addCase(fetchReview.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchReviewUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReviewUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.reviewUser = action.payload
            })
    }
})

export default reviewSlice.reducer