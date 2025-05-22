import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/categories/create-category`,
        categoryData,
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

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/categories/get-categories?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetching categories failed"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/categories/delete-category/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Category deletion failed"
      );
    }
  }
);

export const getCategoriesById = createAsyncThunk(
  "category/getCategoriesById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/categories/category/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetching category failed"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/categories/update-category/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Category update failed");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
    totalCategories: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.totalCategories = action.payload.totalCategories;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deletedCategoryId = action.payload.categoryId;
        state.categories = state.categories.filter(
          (category) => category._id !== deletedCategoryId
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCategoriesById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoriesById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })
      .addCase(getCategoriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCategoryError } = categorySlice.actions;
export default categorySlice.reducer;
