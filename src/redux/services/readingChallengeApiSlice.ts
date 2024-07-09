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
      providesTags:["challenges"]
    }),
    getReadingChallengeById: builder.query<Challenge, string>({
      query(id) {
        return `reading-challenges/${id}`;
      },
      providesTags:["challenges"]
    }),
    createReadingChallenge: builder.mutation<Challenge, CreateChallengePayload>(
      {
        query(data) {
          return {
            url: "reading-challenges",
            method: "POST",
            body: data,
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
          method: "PUT",
          body: challengeData,
        };
      },
      invalidatesTags:["challenges"]
    }),
    deleteReadingChallenge: builder.mutation<null, number>({
      query(id) {
        return {
          url: `reading-challenges/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["challenges"]
    }),
    getUserReadingChallenges: builder.query<Challenge[], number>({
      query(userId) {
        return `reading-challenges/user/${userId}`;
      },
      providesTags: ["challenges"]
    }),
    addBookToReadingChallenge: builder.mutation<
      Challenge[],
      { challengeId: number; bookId: number }
    >({
      query({ challengeId, bookId }) {
        return {
          url: `reading-challenges/add-books/${challengeId}`,
          method: "POST",
          body: { bookId },
        };
      },
      invalidatesTags: ["challenges"]
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
} = readingChallengeApi;
