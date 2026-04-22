import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PREFERENCES_QUIZ, PREFERENCES_QUIZ_OPTIONS } from "../const";


export const fetchQuiz = createAsyncThunk(
    'preferences/saveQuizResults',
    async (quizData) => {
        const response = await fetch(PREFERENCES_QUIZ, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quizData)
        })
        const data = await response.json()
        return data;
    }
)

export const fetchQuizOptions = createAsyncThunk(
    'preferences/getQuizOptions',
    async () => {
        const response = await fetch(PREFERENCES_QUIZ_OPTIONS, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        return data
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
        },
        extraReducers: builder => {
            builder
                .addCase(fetchQuizOptions.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.categories = action.payload.categories
                    state.notes = action.payload.notes
                })
                .addCase(fetchQuiz.fulfilled, (state) => {
                    state.status = 'success';
                })
        }
    }
)

export default preferenceSlice.reducer