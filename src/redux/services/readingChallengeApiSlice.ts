import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  Challenge,
  CreateChallengePayload,
  UpdateChallengePayload,
} from "../../Types/readingChallenges.types";
import { startLoading, stopLoading } from "../features/modals/modalsSlice";
import { BackendError } from "../../Types/types";
import { showAlert } from "../features/alerts/alertsSlice";

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
        return `reading-challenges/${id}`;
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
          };
        },
        invalidatesTags: ["challenges"],
        onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
          try {
            dispatch(startLoading());
            await queryFulfilled;
            dispatch(
              showAlert({
                message: "Challenge created successfully",
                severity: "success",
              })
            )
            dispatch(stopLoading());

          } catch (err) {
            dispatch(stopLoading());
            dispatch(
              showAlert({
                message: "Failed to create challenge",
                severity: "error",
              })
            );
            console.log((err as BackendError).error.data.message);
          }
        }
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
        };
      },
      invalidatesTags: ["challenges"],
    }),
    deleteReadingChallenge: builder.mutation<null, number>({
      query(id) {
        return {
          url: `reading-challenges/${id}`,
          method: "DELETE",
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
