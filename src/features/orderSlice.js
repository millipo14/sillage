import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ORDERS } from "../const";

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async (order) => {
        const response = await fetch(ORDERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(order)
        })
        return await response.json()
    }
)

export const fetchOrderUser = createAsyncThunk(
    'order/fetchOrderUser',
    async (order) => {
        const response = await fetch(ORDERS,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        const data = await response.json()
        return data.orders
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        lastOrder: null,
        userOrders: [],
        status: 'idle',
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.status = 'success';
                state.lastOrder = action.payload;
                state.error = null;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchOrderUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.userOrders = action.payload;
            })
    }
})

export default orderSlice.reducer