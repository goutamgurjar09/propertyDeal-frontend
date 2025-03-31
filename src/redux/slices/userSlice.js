import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Async Thunk for User Signup
export const getUsers = createAsyncThunk(
  "user/getUser",
  async ( _, { rejectWithValue }) => {
    console.log("AdminDashboard");
    
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/users?page=${1}&limit=${20}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {  
        state.loading = false;
        state.userData = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default userSlice.reducer;
