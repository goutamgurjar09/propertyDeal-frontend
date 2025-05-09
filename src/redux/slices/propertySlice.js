import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Create Property
export const createProperty = createAsyncThunk(
  "property/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/properties/create-properties`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Properties
export const getProperties = createAsyncThunk(
  "property/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/properties/get-properties`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Property by ID
export const getPropertyById = createAsyncThunk(
  "property/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/properties/get-property/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Property
export const updateProperty = createAsyncThunk(
  "property/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/properties/update-property/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Property
export const deleteProperty = createAsyncThunk(
  "property/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/properties/delete-property/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    property: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPropertyState: (state) => {
      state.property = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload); // updated here
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Properties
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Property by ID
      .addCase(getPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(getPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.property = action.payload;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter((prop) => prop._id !== action.payload._id); // fixed here
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPropertyState } = propertySlice.actions;
export default propertySlice.reducer;
