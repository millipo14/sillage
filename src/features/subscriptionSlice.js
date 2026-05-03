import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_URL } from "../const";


export const fetchSubscription = createAsyncThunk(
    'subscriptionPlans/fetchSubscription',
    async () => {
        const response = await fetch(SUBSCRIPTION_PLANS)
        return await response.json();
    }
)

export const createSubscription = createAsyncThunk(
    'subscriptionPlans/createSubscription',
    async (subscriptionData, { rejectWithValue }) => {
        try {
            const response = await fetch(SUBSCRIPTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(subscriptionData)
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.error || 'Ошибка при оформлении подписки');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const subscriptionSlice = createSlice({
    name: 'subscriptionPlans',
    initialState: {
        status: 'idle',
        error: null,
        subscriptionPlans: [],
        selectedSamples: JSON.parse(localStorage.getItem('selectedSamples') || '[]'),
        activePlan: JSON.parse(localStorage.getItem('activePlan') || 'null'),
        loading: false,
    },
    reducers: {
        setActivePlan(state, action) {
            state.activePlan = action.payload
            state.selectedSamples = []
            localStorage.setItem('activePlan', JSON.stringify(action.payload));
            localStorage.setItem('selectedSamples', JSON.stringify([]));
        },
        addSampleSubscription(state, action) {
            const perfume = action.payload
            const limit = state.activePlan?.custom_samples || 0
            const isExist = state.selectedSamples.find(sample => sample.id === perfume.id)
            const getSamplewWord = (total) => {
                total = Math.abs(total) % 100;
                const lastDigit = total % 10;

                if (total > 10 && total < 20) return 'пробников';
                if (lastDigit === 1) return 'пробник';
                if (lastDigit >= 2 && lastDigit <= 4) return 'пробника';
                return 'пробников';
            }

            if (!isExist && state.selectedSamples.length < limit) {
                state.selectedSamples.push(perfume);
                localStorage.setItem('selectedSamples', JSON.stringify(state.selectedSamples));
            } else if (state.selectedSamples.length >= limit) {

                alert(`Максимум для этого тарифа: ${limit} ${getSamplewWord(limit)} самостоятельно`);
            }
        },
        removeSampleSubscription(state, action) {
            state.selectedSamples = state.selectedSamples.filter(sample => sample.id !== action.payload)
        },
        clearSampleSubscription(state) {
            state.selectedSamples = []
        }
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
            .addCase(createSubscription.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSubscription.fulfilled, (state) => {
                state.loading = false;
                state.selectedSamples = []
                localStorage.setItem('selectedSamples', JSON.stringify([]));
            })
            .addCase(createSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})
export const { addSampleSubscription, removeSampleSubscription, clearSampleSubscription, setActivePlan } = subscriptionSlice.actions
export default subscriptionSlice.reducer