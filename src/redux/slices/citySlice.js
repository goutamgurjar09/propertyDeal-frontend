import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT_BASE_URL || "http://localhost:8000";

// Get All Cities
export const getCities = createAsyncThunk(
  "city/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cities/get-cities`, { withCredentials: true });
      (response, "response");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create slice
const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.data;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { } = citySlice.actions;
export default citySlice.reducer;