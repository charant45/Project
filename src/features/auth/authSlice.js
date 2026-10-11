import { createSlice } from "@reduxjs/toolkit";

const USERS_KEY = "authUsers";
const SESSION_KEY = "authCurrentUser";

// Demo-only auth: accounts and the active session are stored in localStorage.
// There is no backend, so this is for demonstrating the login/register flow,
// not for storing real passwords.
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
function loadCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: loadUsers(),           // [{ mobile, password }]
    currentUser: loadCurrentUser(), // { mobile } | null
    error: null,
  },
  reducers: {
    registerUser(state, action) {
      const { mobile, password } = action.payload;
      if (state.users.some((u) => u.mobile === mobile)) {
        state.error = "An account with this mobile number already exists.";
        return;
      }
      state.users.push({ mobile, password });
      state.currentUser = { mobile };
      state.error = null;
    },
    loginUser(state, action) {
      const { mobile, password } = action.payload;
      const match = state.users.find((u) => u.mobile === mobile && u.password === password);
      if (!match) {
        state.error = "Invalid mobile number or password.";
        return;
      }
      state.currentUser = { mobile };
      state.error = null;
    },
    logout(state) {
      state.currentUser = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
