import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ORDERS, ORDERS_ID } from "../const";

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
    async () => {
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

export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ orderId, status, customer_id }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ORDERS}/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update status');
            }

            return await response.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await fetch(ORDERS_ID(orderId), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка удаления');
            }

            return orderId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
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
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload.order
                const index = state.userOrders.findIndex(o => o.order_id == updatedOrder.order_id)
                if (index !== -1) {
                    state.userOrders[index].status =updatedOrder.status
                }
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.userOrders = state.userOrders.filter(
                    order => order.order_id !== action.payload
                )
            })
    }
})

export default orderSlice.reducer