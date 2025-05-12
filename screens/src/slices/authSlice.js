// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state of the auth slice
const initialState = {
  user: null, // User data will be stored here
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set user data
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to remove user data (logout)
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export actions to use in components
export const { setUser, logout } = authSlice.actions;

// Export the reducer to configure the store
export default authSlice.reducer;
