import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

const initialState = {
  user: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isMessage: "",
};

// register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.registerUser(userData);
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.loginUser(userData);
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return await authService.logoutUser();
});

// get user
export const getUser = createAsyncThunk(
  "auth/get-user",
  async (_, thunkAPI) => {
    try {
      return await authService.getUser();
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = "";
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action, "action");
        state.isLoading = false;
        state.isSuccess = false;
        state.isMessage = action.payload;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isMessage = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action, "action");
        state.isLoading = false;
        state.isSuccess = false;
        state.isMessage = action.payload;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isMessage = action.payload;
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isMessage = "";
        state.user = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isMessage = action.payload;
        state.user = "";
      })
      
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
