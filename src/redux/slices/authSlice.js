import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Async Thunk for User Signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// Verify by otp
// Async Thunk for User Signup
export const verifyUser = createAsyncThunk(
  "auth/verify",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, userData, {
        withCredentials: true,
      });
      console.log(response, "response");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgetpassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/loginGoogle",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/google-auth`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
