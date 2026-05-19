import { combineReducers } from "@reduxjs/toolkit"
import authReducer from './features/authSlice'
import subscriptionReducer from './features/subscriptionSlice'
import perfumeReducer from './features/perfumeSlice'
import cartReducer from './features/cartSlice'
import brandsReducer from "./features/brandsSlice"
import filterReducer from "./features/filterSlice"
import preferencesReducer from "./features/preferenceSlice"
import orderReducer from './features/orderSlice'
import reviewReducer from './features/reviewSlice'
import recommendationReducer from "./features/recommendationSlice"
import adminReducer from './features/adminSlice'
import adminAnalyticsReducer from './features/adminAnalyticsSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    subscriptionPlans: subscriptionReducer,
    perfume: perfumeReducer,
    cart: cartReducer,
    brands: brandsReducer,
    filters: filterReducer,
    preferences: preferencesReducer,
    order: orderReducer,
    reviews: reviewReducer,
    recommendations: recommendationReducer,
    admin: adminReducer,
    adminAnalytics: adminAnalyticsReducer
})

export default rootReducer