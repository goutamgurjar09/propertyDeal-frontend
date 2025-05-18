// redux/slices/contactFormSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Async action to submit form data
export const submitEnquiryForm = createAsyncThunk(
  "enquiryForm/submit",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/enquiries/enquiry`,
        formData,
        {
          withCredentials: true,
        }
      ); // Replace with your endpoint
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action to get all enquiries
export const getEnquiries = createAsyncThunk(
  "enquiryForm/getEnquiries",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/enquiries/enquiries`, {
        params,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action to delete an enquiry
export const deleteEnquiry = createAsyncThunk(
  "enquiryForm/deleteEnquiry",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/enquiries/enquiry/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const enquiryFormSlice = createSlice({
  name: "enquiryForm",
  initialState: {
    loading: false,
    success: false,
    error: null,
    enquiryData: [],
     totalEnquiries: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  reducers: {
    resetFormStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiryForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitEnquiryForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEnquiryForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(getEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiryData = action.payload.data;
        state.totalEnquiries = action.payload.totalEnquiries;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.enquiryData = state.enquiryData.filter(
          (enquiry) => enquiry._id !== action.payload._id
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetFormStatus } = enquiryFormSlice.actions;
export default enquiryFormSlice.reducer;
