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
    updateReadingChallenge: builder.mutation<
      Challenge,
      { id: string; challengeData: Challenge }
    >({
      query({ id, challengeData }) {
        return {
          url: `challenges/${id}`,
          method: "PATCH",
          body: challengeData,
        };
      },
    }),
    deleteChallenge: builder.mutation<null, string>({
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
  useCreateReadingChallengeMutation,
  useDeleteChallengeMutation,
  useGetAllUserChallengesQuery,
  useGetReadingChallengeByIdQuery,
  useUpdateReadingChallengeMutation,
} = readingChallengeApi;
