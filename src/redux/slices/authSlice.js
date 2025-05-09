import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthSession, clearAuthSession } from "./authUtlis";

const BASE_URL = "http://localhost:8000";

// ========== AUTH THUNKS ==========

// Signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

// Generate OTP
export const generateOtp = createAsyncThunk(
  "auth/generateOtp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/generate-otp`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "OTP generation failed");
    }
  }
);

// Verify OTP
export const verifyUser = createAsyncThunk(
  "auth/verify",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, userData, {
        withCredentials: true,
      });
      console.log(response, "response");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Verification failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/reset-password`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Reset failed");
    }
  }
);

// Google Auth
export const googleAuth = createAsyncThunk(
  "auth/loginGoogle",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/google-auth`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Google auth failed");
    }
  }
);

// ========== GET USERS API ==========
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async ({ page = 1, limit = 10 }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(
        `${BASE_URL}/api/auth/users?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

// ========== AUTH SLICE ==========
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    users: [],
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      clearAuthSession(); 
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.data?.accessToken;
        setAuthSession(action.payload.data);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
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

      // Generate OTP
      .addCase(generateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.data?.accessToken;
        setAuthSession(action.payload.data);
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
