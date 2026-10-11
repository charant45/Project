import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../../api/productsApi";

export const loadProducts = createAsyncThunk(
  "products/load",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllProducts();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// The details page reuses the loaded list; if the user opened the URL directly, load it first
export const loadProductById = createAsyncThunk(
  "products/loadById",
  async (id, { getState, rejectWithValue }) => {
    try {
      let list = getState().products.items;
      if (list.length === 0) list = await fetchAllProducts();
      const product = list.find((p) => String(p.id) === String(id));
      if (!product) throw new Error("Product not found.");
      return product;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  search: "",
  category: "all",
  selected: null,
  detailStatus: "idle",
  detailError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.category = "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })
      .addCase(loadProductById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.selected = null;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selected = action.payload;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || "Something went wrong";
      });
  },
});

export const { setSearch, setCategory, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;

// ---- Selectors ----
const selectItems = (state) => state.products.items;
const selectSearch = (state) => state.products.search;
const selectCategory = (state) => state.products.category;

export const selectCategories = createSelector([selectItems], (items) =>
  Array.from(new Set(items.map((p) => p.category))).sort()
);

export const selectFilteredProducts = createSelector(
  [selectItems, selectSearch, selectCategory],
  (items, search, category) => {
    const query = search.trim().toLowerCase();
    return items.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!query || `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(query))
    );
  }
);
