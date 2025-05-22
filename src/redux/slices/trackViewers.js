import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Track Viewers
export const trackViewers = createAsyncThunk(
  "trackViewers/track",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/viewers/track-viewers`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Track Viewers
export const getTrackViewersCount = createAsyncThunk(
  "trackViewers/getTrack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/viewers/get-viewers`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Track Viewers Slice
const trackViewersSlice = createSlice({
  name: "trackViewers",
  initialState: {
    trackViewersCount: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetTrackViewersState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trackViewers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(trackViewers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(trackViewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Tracking failed";
      })
      .addCase(getTrackViewersCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrackViewersCount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.trackViewersCount = action.payload.data;
      })
      .addCase(getTrackViewersCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch track viewers count";
      });
  },
});

export const { resetTrackViewersState } = trackViewersSlice.actions;
export default trackViewersSlice.reducer;