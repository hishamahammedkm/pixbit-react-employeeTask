import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDate } from "date-fns";
// import axios from 'axios';

import API from "../api";
const initialState = {
  isLoggedIn: false,
  user: {},
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userData, history }) => {
    try {
      const response = await API.post("/register", userData);
      history.push("/employeelist");

      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ loginData, history }) => {
    try {
      const response = await API.post("/login", loginData);
      history.push("/employeelist");

      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    setUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.data.access_token);

      state.loading = false;
      state.error = null;
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.data.access_token;
      localStorage.setItem("token", action.payload.data.access_token);
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
