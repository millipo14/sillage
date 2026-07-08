import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADMIN_SUBSCRIPTIONS, ADMIN_USERS } from "../const";
import { deleteOrder, updateOrderStatus } from "./orderSlice";

export const fetchUsersForAdmins = createAsyncThunk(
    'admin/fetchUsersForAdmins',
    async () => {
        const response = await fetch(ADMIN_USERS)
        return await response.json()
    }
)
export const fetchAdminSubscriptions = createAsyncThunk(
    'admin/fetchAdminSubscriptions',
    async () => {

        const response = await fetch(ADMIN_SUBSCRIPTIONS, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return await response.json()
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        status: 'idle',
        error: null,
        users: [],
        subsriptionsUsers: [],
    },

    extraReducers: builder => {
        builder
            .addCase(fetchUsersForAdmins.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsersForAdmins.fulfilled, (state, action) => {
                state.status = 'fullfiled'
                state.users = action.payload
            })
            .addCase(fetchAdminSubscriptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdminSubscriptions.fulfilled, (state, action) => {
                state.status = 'fullfiled'
                state.subsriptionsUsers = action.payload
            })
            .addCase(fetchUsersForAdmins.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload.order;
                state.users.forEach(user => {
                    const order = user.orders?.find(o => o.order_id == updatedOrder.order_id);
                    if (order) {
                        order.status = updatedOrder.status;
                    }
                })
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                const deletedOrderId = action.payload;
                state.users.forEach(user => {
                    if (user.orders) {
                        user.orders = user.orders.filter(o => o.order_id !== deletedOrderId);
                    }
                })
            })
    }
})

export default adminSlice.reducer