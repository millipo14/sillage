import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUBSCRIPTION_PLANS } from "../const";


export const fetchSubscription = createAsyncThunk(
    'subscriptionPlans/fetchSubscription',
    async () => {
        const response = await fetch(SUBSCRIPTION_PLANS)
        return await response.json();
    }
)

const subscriptionSlice = createSlice({
    name: 'subscriptionPlans',
    initialState: {
        status: 'idle',
        error: null,
        subscriptionPlans: [],
    },

    extraReducers: builder => {
        builder
            .addCase(fetchSubscription.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubscription.fulfilled, (state, action) => {
                state.status = 'success';
                state.subscriptionPlans = action.payload;
            })
            .addCase(fetchSubscription.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default subscriptionSlice.reducer