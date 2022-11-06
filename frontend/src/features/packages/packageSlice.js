import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import packageService from "./packageService";

const initialState = {
  packageItems: [],
  packageDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  trackingNumber: "",
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
      .addCase(getPackageByNumber.pending, (state) => {
        // state.packageItems.filter(packageItem)
        state.isLoading = true;
      })
      .addCase(getPackageByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.packageDetails = action.payload;
      })
      .addCase(getPackageByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = packagesSlice.actions;

export default packagesSlice.reducer;
