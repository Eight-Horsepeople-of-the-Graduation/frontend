import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  AuthResponse,
  SignUpUser,
  User,
  UserCredintials,
} from "../../Types/users.types";
import { setLogedInUser } from "../features/users/authSlice";
import { startLoading, stopLoading } from "../features/modals/modalsSlice";
import { showAlert } from "../features/alerts/alertsSlice";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query() {
        return "users";
      },
    }),
    getUserById: builder.query<User, number>({
      query(id) {
        return `users/${id}`;
      },
      providesTags: ["users"],
    }),
    getUserByUsername: builder.query<User, string>({
      query(username) {
        return `users/username/${username}`;
      },
      providesTags: ["users"],
    }),
    logIn: builder.mutation<AuthResponse, UserCredintials>({
      query(loginData) {
        return {
          url: "auth/login",
          method: "POST",
          body: loginData,
        };
      },
      invalidatesTags: ["users"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          document.cookie = `accessToken = ${response.data.tokens.accessToken}`;
          document.cookie = `refreshToken = ${response.data.tokens.refreshToken}`;
          dispatch(setLogedInUser(response.data.user));
        } catch (error) {
          localStorage.removeItem("user");
          localStorage.removeItem("tokens");
        }
      },
    }),
    signUp: builder.mutation<AuthResponse, SignUpUser>({
      query(userData) {
        return {
          url: "auth/signup",
          method: "POST",
          body: userData,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(startLoading());
          const response = await queryFulfilled;
          const data = response.data;
          dispatch(setLogedInUser(data.user));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("tokens", JSON.stringify(data.tokens));
          dispatch(stopLoading());
        } catch (error) {
          dispatch(stopLoading());
          dispatch(
            showAlert({ message: "something went wrong", severity: "error" })
          );
        }
      },
      invalidatesTags: ["users"],
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
          method: "DELETE",
        };
      },
    }),
    editUser: builder.mutation<User, { id: string; info: FormData }>({
      query({ id, info }) {
        return {
          url: `users/${id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: ["users"],
    }),
    removeUserById: builder.mutation<null, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByUsernameQuery,
  useLogInMutation,
  useSignUpMutation,
  useLogoutMutation,
  useEditUserMutation,
  useRemoveUserByIdMutation,
} = usersApi;
