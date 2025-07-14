import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMiIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3NTI0ODY5NTIsImV4cCI6MTc1MjUyMjk1Mn0.MeFGRHoA5Ld99tG-Rzolqa_dGOPvx5RtfZKGuuQemxU",
  role : "ROLE_USER",
  username : "user2"
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
