import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_LOGIN, AUTH_PROFILE } from "../const";


export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async ({ email, password }) => {
        const response = await fetch(AUTH_LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Ошибка авторизации')
        }
        return await response.json();
    }
)

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async () => {
        const response = await fetch(AUTH_PROFILE, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        return await response.json()
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAdmin: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'success';
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.isAdmin = action.payload.user?.role === 'admin';
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;