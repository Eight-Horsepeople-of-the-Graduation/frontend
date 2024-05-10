import { configureStore } from "@reduxjs/toolkit";
// ? import authReducer from authSlice
import authReducer from "./features/users/authSlice";
import alertReducer from "./features/alerts/alertsSlice";
import modalsReducer from "./features/modals/modalsSlice";
import { booksApi } from "./services/booksApiSlice";
import { listsApi } from "./services/listsApiSlice";
import { readingChallengeApi } from "./services/readingChallengeApiSlice";

export const store = configureStore({
  reducer: {
    // States
    authUser: authReducer,
    alert: alertReducer,
    modals: modalsReducer,

    // API
    [booksApi.reducerPath]: booksApi.reducer,
    [listsApi.reducerPath]: listsApi.reducer,
    [readingChallengeApi.reducerPath]: readingChallengeApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      booksApi.middleware,
      listsApi.middleware,
      readingChallengeApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
