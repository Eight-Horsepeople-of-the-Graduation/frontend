import { configureStore } from "@reduxjs/toolkit";
// ? import authReducer from authSlice
import authReducer from "./features/users/authSlice";
import counterReducer from "./features/counterSlice";
import { booksApi } from "./services/booksApiSlice";

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    authUser: authReducer,
    counter: counterReducer,

    // API
    [booksApi.reducerPath]: booksApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([booksApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;