import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { SignUpUser, User, UserCredintials } from "../../Types/users.types";

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
    }),
    logIn: builder.mutation<User, UserCredintials>({
      query(loginData) {
        return {
          url: "users/login",
          method: "GET",
          body: loginData,
        };
      },
    }),
    signUp: builder.mutation<User, SignUpUser>({
      query(userData) {
        return {
          url: "users",
          method: "POST",
          body: userData,
        };
      },
    }),
    editUser: builder.mutation<User, { id: string; info: FormData }>({
      query({ id, info }) {
        return {
          url: `users/${id}`,
          method: "PUT",
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
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useSignUpMutation,
  useEditUserMutation,
  useRemoveUserByIdMutation,
} = usersApi;
