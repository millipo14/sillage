import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADMIN_DASHBOARD, ADMIN_GENDERS, ADMIN_HITS_PERFUMES, ADMIN_REVENUE } from "../const";

export const fetchDashboards = createAsyncThunk(
    'adminAnalytics/fetchDashboards',
    async (period = 'week') => {
        const response = await fetch(`${ADMIN_DASHBOARD}?period=${period}`, {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        return await response.json()
    }
)
export const fetchRevenueChart = createAsyncThunk(
    'adminAnalytics/fetchRevenueChart',
    async (period = 'week') => {
        const response = await fetch(`${ADMIN_REVENUE}?period=${period}`, {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        return await response.json()
    }
)
export const fetchGenderChart = createAsyncThunk(
    'adminAnalytics/fetchGenderChart',
    async (period = 'week') => {
        const response = await fetch(`${ADMIN_GENDERS}?period=${period}`, {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        return await response.json()
    }
)
export const fetchHitsChart = createAsyncThunk(
    'adminAnalytics/fetchHitsChart',
    async (period = 'week') => {
        const response = await fetch(`${ADMIN_HITS_PERFUMES}?period=${period}`, {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        return await response.json()
    }
)

const adminAnalyticsSlice = createSlice({
    name: 'adminAnalytics',
    initialState: {
        stats: {
            revenue: 0,
            ordersCount: 0,
            averageCheck: 0,
            usersCount: 0,
            trends: {
                revenue: 0,
                orders: 0,
                averageCheck: 0,
                users: 0
            }
        },
        revenueChart: [],
        genderChart: [],
        hitsPerfumes: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboards.fulfilled, (state, action) => {
                state.stats = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchRevenueChart.fulfilled, (state, action) => {
                state.revenueChart = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchGenderChart.fulfilled, (state, action) => {
                state.genderChart = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchHitsChart.fulfilled, (state, action) => {
                state.hitsPerfumes = action.payload;
                state.status = 'succeeded';
            })
    }
})

export default adminAnalyticsSlice.reducer