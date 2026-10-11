import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "favorites";

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: loadFavorites() },
  reducers: {
    // Add the product if missing, remove it if already a favorite
    toggleFavorite(state, action) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) state.items.splice(index, 1);
      else state.items.push(action.payload);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((p) => p.id === id);
export default favoritesSlice.reducer;
