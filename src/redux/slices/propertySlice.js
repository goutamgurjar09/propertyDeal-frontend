import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_ENDPOINT_BASE_URL;

// Create Property
export const createProperty = createAsyncThunk(
  "property/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/properties/create-properties`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Properties
export const getProperties = createAsyncThunk(
  "property/getProperties",
  async (
    {
      page = 1,
      limit = 10,
      propertyType = "",
      cityId,
      lat,
      lng,
      categoryId,
      subCategory,
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (cityId) {
        params.append("cityId", cityId);
      }
      if (lat && lng) {
        params.append("lat", lat);
        params.append("lng", lng);
      }

      if (categoryId) params.append("categoryId", categoryId);
      if (subCategory) params.append("subCategory", subCategory);

      // Only append propertyType if it exists and is non-empty
      if (propertyType.trim()) {
        params.append("propertyType", propertyType);
      }

      const response = await axios.get(
        `${API_URL}/properties/get-properties?${params.toString()}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch properties"
      );
    }
  }
);

// Get Property by ID
export const getPropertyById = createAsyncThunk(
  "property/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/properties/get-property/${id}`,
        { withCredentials: true }
      );
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
      const response = await axios.patch(
        `${API_URL}/properties/update-property/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
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
      await axios.delete(`${API_URL}/properties/delete-property/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePropertyStatus = createAsyncThunk(
  "property/updatePropertyStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/properties/update-status`,
        { propertyId: id, status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update booking status"
      );
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
    totalProperties: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
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
        state.properties.push(action.payload);
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
        state.properties = action.payload.data;
        state.totalProperties = action.payload.totalProperties;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
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
        state.property = action.payload.data;
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
        const updated = action.payload.data;
        const index = state.properties.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.properties[index] = updated;
        }
        state.property = updated;
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
        state.properties = state.properties.filter(
          (prop) => prop._id !== action.payload
        );
      })

      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePropertyStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePropertyStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;

        // Update the status of the specific booking in the state
        const updateProperty = action.payload.data;
        const index = state.properties.findIndex(
          (b) => b._id === updateProperty._id
        );
        if (index !== -1) {
          state.properties[index] = updateProperty;
        }
      })
      .addCase(updatePropertyStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update property status";
      });
  },
});

export const { resetPropertyState } = propertySlice.actions;
export default propertySlice.reducer;
