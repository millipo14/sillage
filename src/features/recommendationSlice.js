import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RECOMMENDATIONS } from "../const";

export const fetchRecommendations = createAsyncThunk(
    'recommendations/fetchRecommendations',
    async () => {
        const response = await fetch(RECOMMENDATIONS, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        return data.recommendations
    }
)

const recommendationsSlice = createSlice(
    {
        name: 'recommendations',
        initialState: {
            status: 'idle',
            error: null,
            userRecommend: [],
        },
        extraReducers: builder => {
            builder
                .addCase(fetchRecommendations.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(fetchRecommendations.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.userRecommend = action.payload
                })
                .addCase(fetchRecommendations.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                });
        }

    }
)

export default recommendationsSlice.reducer