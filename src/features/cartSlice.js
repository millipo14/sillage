import { createSlice } from "@reduxjs/toolkit"
import { fetchOrder } from "./orderSlice";


const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user ? `cart_${user.customer_id}` : 'cart_guest'
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem(getCartKey()) || '[]'),
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
            localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length;
        },

        removeFromCart(state, action) {
            const { id, volume } = action.payload;
            state.cartItems = state.cartItems.filter(
                item => !(item.id === id && item.volume.volume_ml === volume.volume_ml)
            )

            localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
            state.countItems = state.cartItems.length
        },
        incrementItem(state, action) {
            const { id, volume } = action.payload
            const item = state.cartItems.find(item => item.id === id && item.volume.volume_ml === volume.volume_ml)
            if (item) item.count += 1
            localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
        },

        decrementItem(state, action) {
            const { id, volume } = action.payload
            const item = state.cartItems.find(item => item.id === id && item.volume.volume_ml === volume.volume_ml)
            if (item && item.count > 1) item.count -= 1
            localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
        },
        clearCart(state) {
            state.cartItems = []
            state.countItems = 0
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrder.fulfilled, (state) => {
            state.cartItems = []
            state.countItems = 0
            localStorage.removeItem(getCartKey())
        })
    }
})

export const { addToCart, removeFromCart, incrementItem, decrementItem, clearCart } = cartSlice.actions
export default cartSlice.reducer