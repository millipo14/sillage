import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PREFERENCES, PREFERENCES_QUIZ, PREFERENCES_QUIZ_OPTIONS } from "../const";


export const fetchQuiz = createAsyncThunk(
    'preferences/saveQuizResults',
    async (quizData, { rejectWithValue }) => {
        const token = localStorage.getItem('token')
        if (!token) return rejectWithValue('No token')

        const response = await fetch(PREFERENCES_QUIZ, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quizData)
        })

        if (!response.ok) {
            return rejectWithValue('Unauthorized')
        }

        const data = await response.json()
        return data;
    }
)

export const fetchQuizOptions = createAsyncThunk(
    'preferences/getQuizOptions',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token')
        if (!token) return rejectWithValue('No token')

        const response = await fetch(PREFERENCES_QUIZ_OPTIONS, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            return rejectWithValue('Unauthorized')
        }

        const data = await response.json()
        return data
    }
)

export const fetchUserPrefs = createAsyncThunk(
    'preferences/fetchUserPrefs',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token')
        if (!token) return rejectWithValue('No token')

        const response = await fetch(PREFERENCES, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            return rejectWithValue('Unauthorized')
        }
        return await response.json()
    }
)


const preferenceSlice = createSlice(
    {
        name: 'preferences',
        initialState: {
            status: 'idle',
            error: null,
            categories: [],
            notes: [],
            userPrefs: [],
        },
        extraReducers: builder => {
            builder
                .addCase(fetchQuizOptions.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.categories = action.payload.categories
                    state.notes = action.payload.notes
                })
                .addCase(fetchQuiz.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.userPrefs = action.payload
                })
                .addCase(fetchUserPrefs.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.userPrefs = action.payload
                })
                .addCase(fetchUserPrefs.rejected, (state) => {
                    state.status = 'error'
                })
                .addCase(fetchQuizOptions.rejected, (state) => {
                    state.status = 'error'
                })
                .addCase(fetchQuiz.rejected, (state) => {
                    state.status = 'error'
                })
        }
    }
)

export default preferenceSlice.reducer