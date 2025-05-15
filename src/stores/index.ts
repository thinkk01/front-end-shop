import { configureStore } from "@reduxjs/toolkit";

import user from "@/stores/apps/user";
import auth from "@/stores/apps/auth";

export const store = configureStore({
  reducer: {
    user,
    auth
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
