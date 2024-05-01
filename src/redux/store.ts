import { configureStore } from "@reduxjs/toolkit";
// ? import authReducer from authSlice
import authReducer from "./features/users/authSlice";
import alertReducer from "./features/alerts/alertsSlice";
import readingChallengeReducer from "./features/readingChallenges/readingChallengeSlice";
import { booksApi } from "./services/booksApiSlice";
import { listsApi } from "./services/listsApiSlice";

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    authUser: authReducer,
    alert: alertReducer,
    readingChallenge: readingChallengeReducer,

    // API
    [booksApi.reducerPath]: booksApi.reducer,
    [listsApi.reducerPath]: listsApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([booksApi.middleware, listsApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
