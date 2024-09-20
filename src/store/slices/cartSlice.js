// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    value:0,
  },

  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    cartLength: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

  },
});
export const { cartLength, decrement, incrementByAmount, addToCart, removeFromCart } = cartSlice.actions;
// export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
