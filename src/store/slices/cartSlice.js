import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Fetch } from "../../utils/Fetch";

// Thunk to fetch cart items from the server
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Fetch(`cart/${userId}`, "GET");
      if (!response) {
        return rejectWithValue("Failed to fetch cart items.");
      }
      const data = await response.json();
      return data.items; // Return the cart items
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to sync cart item updates (like quantity change) with the server
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await Fetch("cart", "POST", {
        userId,
        productId,
        quantity,
      });
      if (!response) {
        return rejectWithValue("Failed to update cart item.");
      }
      const data = await response.json();
      return data; // Return the updated cart data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: null, // for tracking loading state
    error: null, // for tracking errors
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Populate items with the fetched cart data
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === productId);
        if (existingItem) {
          existingItem.quantity = quantity;
        }
      });
  },
});

export const { addToCart, removeFromCart, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
