import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import packagesReducer from "../features/packages/packageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packagesReducer,
  },
});
