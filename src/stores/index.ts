import { configureStore } from "@reduxjs/toolkit";

import user from "@/stores/user";
import auth from "@/stores/auth";
import role from "@/stores/role";

export const store = configureStore({
  reducer: {
    user,
    auth,
    role
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
