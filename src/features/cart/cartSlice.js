import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cartItems";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart() }, // [{ ...product, quantity }]
  reducers: {
    // Add the product, or bump its quantity if it's already in the cart
    addToCart(state, action) {
      const existing = state.items.find((p) => p.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    incrementQuantity(state, action) {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity(state, action) {
      const item = state.items.find((p) => p.id === action.payload);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((p) => p.id !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export const selectIsInCart = (id) => (state) => state.cart.items.some((p) => p.id === id);
export const selectCartCount = (state) => state.cart.items.reduce((sum, p) => sum + p.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
export default cartSlice.reducer;
