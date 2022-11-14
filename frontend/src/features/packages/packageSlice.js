import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import packageService from "./packageService";

const initialState = {
  packageItems: [],
  packageDetails: [],
  currentPackage: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPackage = createAsyncThunk(
  "package/createPackage",
  async (packages, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await packageService.createPackage(packages, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get package tracking info
export const getPackageByNumber = createAsyncThunk(
  "packages/getPackageByNumber",
  async (trackingNumber, thunkAPI) => {
    trackingNumber = trackingNumber;

    try {
      return await packageService.getPackageByNumber(trackingNumber);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all packages from user
export const getPackages = createAsyncThunk(
  "packages/getPackages",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await packageService.getPackages(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a package
export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async ({ packageId, onDelete }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      const results = await packageService.deletePackage(packageId, token);
      onDelete();
      return results;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    reset(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    updateCurrentPackage(state, action) {
      state.currentPackage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPackage.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.packageItems = action.payload;
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPackageByNumber.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPackageByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.packageDetails = action.payload;
        state.currentPackage = "";
      })
      .addCase(getPackageByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deletePackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { reset, updateCurrentPackage } = packagesSlice.actions;

export default packagesSlice.reducer;
