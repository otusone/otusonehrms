// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // Import the auth reducer

// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer, // Adding auth slice reducer to the store
  },
});

export default store;
