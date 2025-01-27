import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    clear: (state) => {
      Object.assign(state, initialState); // Reset state to the initial state
    },
  },
});

export const { login, logout, clear } = authSlice.actions;

export default authSlice.reducer;



//create backend project - login, reg, 2 factor auth