import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  Challenge,
  CreateReadingChallengePayload,
} from "../../Types/readingChallengeTypes";

export const readingChallengeApi = createApi({
  reducerPath: "readingChallengeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["challenges"],
  endpoints: (builder) => ({
    getAllReadingChallenges: builder.query<Challenge[], void>({
      query() {
        return "challenges";
      },
    }),
    getAllUserChallenges: builder.query<Challenge[], number>({
      query(userId) {
        return `challenges/user/${userId}`;
      },
    }),
    getReadingChallengeById: builder.query<Challenge, string>({
      query(id) {
        return `challenges/${id}`;
      },
    }),
    createReadingChallenge: builder.mutation<
      Challenge,
      CreateReadingChallengePayload
    >({
      query(data) {
        return {
          url: "challenges",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["challenges"],
    }),
    editReadingChallenge: builder.mutation<
      Challenge,
      { id: number; challengeData: Challenge }
    >({
      query({ id, challengeData }) {
        return {
          url: `challenges/${id}`,
          method: "PUT",
          body: challengeData,
        };
      },
    }),
    deleteReadingChallenge: builder.mutation<null, string>({
      query(id) {
        return {
          url: `lists/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllReadingChallengesQuery,
  useGetAllUserChallengesQuery,
  useGetReadingChallengeByIdQuery,
  useCreateReadingChallengeMutation,
  useEditReadingChallengeMutation,
  useDeleteReadingChallengeMutation,
} = readingChallengeApi;
