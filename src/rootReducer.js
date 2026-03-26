import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import subscriptionReducer from './features/subscriptionSlice'
import perfumeReducer from './features/perfumeSlice'
import cartReducer from './features/cartSlice'
import brandsReducer from "./features/brandsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    subscriptionPlans: subscriptionReducer,
    perfume: perfumeReducer,
    cart: cartReducer,
    brands: brandsReducer,
})

export default rootReducer