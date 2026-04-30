import { createSlice } from "@reduxjs/toolkit"
import { fetchOrder } from "./orderSlice";


const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems,
        countItems: cartItems.length,
    },
    reducers: {
        addToCart(state, action) {
            const { id, name, brand, volume, count, image_url } = action.payload;
            const item = state.cartItems.find(
                item => item.id === id && item.volume.volume_ml === volume.volume_ml
            )
            if (item) {
                item.count += count
            } else {
                state.cartItems.push({ id, name, brand, volume, count, image_url })
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length;
        },

        removeFromCart(state, action) {
            const { id, volume } = action.payload;
            state.cartItems = state.cartItems.filter(
                item => !(item.id === id && item.volume.volume_ml === volume.volume_ml)
            )

            localStorage.setItem('cart', JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length
        },
        incrementItem(state, action) {
            const { id, volume } = action.payload
            const item = state.cartItems.find(item => item.id === id && item.volume.volume_ml === volume.volume_ml)
            if (item) item.count += 1
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },

        decrementItem(state, action) {
            const { id, volume } = action.payload
            const item = state.cartItems.find(item => item.id === id && item.volume.volume_ml === volume.volume_ml)
            if (item && item.count > 1) item.count -= 1
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchOrder.fulfilled, (state) => {
            state.cartItems = []
            state.countItems = 0
            localStorage.removeItem('cart')
        })
    }
})

export const { addToCart, removeFromCart, incrementItem, decrementItem } = cartSlice.actions
export default cartSlice.reducer