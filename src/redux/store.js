import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"
import resetSlice from "./features/resetSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    reset: resetSlice,
  },
})
