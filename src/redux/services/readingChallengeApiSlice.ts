import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  Challenge,
  CreateChallengePayload,
  UpdateChallengePayload,
} from "../../Types/readingChallenges.types";

export const readingChallengeApi = createApi({
  reducerPath: "readingChallengeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["challenges"],
  endpoints: (builder) => ({
    getAllReadingChallenges: builder.query<Challenge[], void>({
      query() {
        return "reading-challenges";
      },
      providesTags: ["challenges"],
    }),
    getReadingChallengeById: builder.query<Challenge, number>({
      query(id) {
        return {
          url: `reading-challenges/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["challenges"],
    }),
    createReadingChallenge: builder.mutation<Challenge, CreateChallengePayload>(
      {
        query(data) {
          return {
            url: "reading-challenges",
            method: "POST",
            body: data,
            credentials: "include",
          };
        },
        invalidatesTags: ["challenges"],
      }
    ),
    editReadingChallenge: builder.mutation<
      Challenge,
      { id: number; challengeData: UpdateChallengePayload }
    >({
      query({ id, challengeData }) {
        return {
          url: `reading-challenges/${id}`,
          method: "PATCH",
          body: challengeData,
          credentials: "include",
        };
      },
      invalidatesTags: ["challenges"],
    }),
    deleteReadingChallenge: builder.mutation<null, number>({
      query(id) {
        return {
          url: `reading-challenges/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["challenges"],
    }),
    getUserReadingChallenges: builder.query<Challenge[], number>({
      query(userId) {
        return `users/${userId}/readingChallenges`;
      },
      providesTags: ["challenges"],
    }),
    addBookToActiveChallenges: builder.mutation<
      Challenge[],
      { userId: number; bookId: number }
    >({
      query({ userId, bookId }) {
        return {
          url: `reading-challenges/${userId}/add-books/${bookId}`,
          method: "PATCH",
          credentials: "include",
        };
      },
      invalidatesTags: ["challenges"],
    }),
  }),
});

export const {
  useGetAllReadingChallengesQuery,
  useGetReadingChallengeByIdQuery,
  useCreateReadingChallengeMutation,
  useEditReadingChallengeMutation,
  useDeleteReadingChallengeMutation,
  useGetUserReadingChallengesQuery,
  useAddBookToActiveChallengesMutation,
} = readingChallengeApi;
