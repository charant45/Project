import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

// Persist favorites and auth so they survive a page refresh
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("favorites", JSON.stringify(state.favorites.items));
    localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
    localStorage.setItem("authUsers", JSON.stringify(state.auth.users));
    if (state.auth.currentUser) {
      localStorage.setItem("authCurrentUser", JSON.stringify(state.auth.currentUser));
    } else {
      localStorage.removeItem("authCurrentUser");
    }
  } catch {
    /* storage unavailable, ignore */
  }
});
