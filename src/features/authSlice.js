import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_LOGIN } from "../const";


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

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        user: null,
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
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;