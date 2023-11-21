// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return action.payload; // assuming the payload is an object with user registration data
        },
        clearUser: (state) => {
            return {}; // clear user data
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
