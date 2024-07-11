import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { SignUpUser, User, UserCredintials } from "../../Types/users.types";
import { setLogedInUser } from "../features/users/authSlice";

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
    logIn: builder.mutation<User, UserCredintials>({
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
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(setLogedInUser(response.data));
        } catch (error) {
          localStorage.removeItem("user");
        }
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
      invalidatesTags: ["users"],
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
  useEditUserMutation,
  useRemoveUserByIdMutation,
} = usersApi;
