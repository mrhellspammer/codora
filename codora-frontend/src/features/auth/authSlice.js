import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    role: null,
    username: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, role, username } = action.payload;
            state.token = token;
            state.role = role;
            state.username = username;
          },
          logout: (state) => {
            state.token = null;
            state.role = null;
            state.username = null;
          },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
