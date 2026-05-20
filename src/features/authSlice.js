import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_LOGIN, AUTH_PROFILE, AUTH_REGISTER } from "../const";


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

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async ({ first_name, last_name, phone, email, password }) => {

        const response = await fetch(AUTH_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                phone,
                email,
                password,
            })
        })

        if (!response.ok) {
            throw new Error('Ошибка регистрации')
        }

        return await response.json()
    }
)


const userFromStorage = JSON.parse(localStorage.getItem('user'))

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        user: userFromStorage || null,
        isAdmin: userFromStorage?.role === 'admin',
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
            localStorage.removeItem('user')
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
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAdmin = action.payload?.role === 'admin';
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'success'
                state.token = action.payload.token
                state.user = action.payload.user
                state.isAdmin = action.payload.user?.role === 'admin'

                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;