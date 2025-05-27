import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT_BASE_URL || "http://localhost:8000";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/bookings/create-booking`,
        bookingData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookings = createAsyncThunk(
  "booking/getBooking",
  async ({ page, limit, status, name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bookings/get-bookings?page=${page}&limit=${limit}&status=${status || ""}&name=${name || ""}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching booking failed");
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/bookings/delete-booking/${bookingId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Booking deletion failed");
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/bookings/update-status`,
        { bookingId: id, status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update booking status");
    }
  }
);

export const getTotalRevenue = createAsyncThunk(
  "booking/getTotalRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bookings/get-revenue`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching booking failed");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: [],
    totalRevenueData: {},
    loading: false,
    error: null,
    successMessage: null,
    totalBookings: 0,
    totalConfirmedBookings: 0,
    totalPendingBookings: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  reducers: {
    resetBookingState: (state) => {
      state.booking = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.data;
        state.success = action.payload.message;
        state.totalBookings = action.payload.totalBookings;
        state.totalConfirmedBookings = action.payload.totalConfirmedBookings;
        state.totalPendingBookings = action.payload.totalPendingBookings;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = state.booking.filter(
          (booking) => booking._id !== action.meta.arg
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;

        // Update the status of the specific booking in the state
        const updatedBooking = action.payload.data;
        const index = state.booking.findIndex((b) => b._id === updatedBooking._id);
        if (index !== -1) {
          state.booking[index] = updatedBooking;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update booking status";
      })
      .addCase(getTotalRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenueData = action.payload.data;
        state.success = action.payload.message;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
