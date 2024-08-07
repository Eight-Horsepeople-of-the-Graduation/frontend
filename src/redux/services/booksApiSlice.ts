import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  AddReview,
  Book,
  EditReviewContentPayload,
  EditReviewRatingPayload,
  Review,
} from "../../Types/books.types";
import { showAlert } from "../features/alerts/alertsSlice";
import { listsApi } from "./listsApiSlice";
import { startLoading, stopLoading } from "../features/modals/modalsSlice";
import { BackendError } from "../../Types/types";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["books", "reviews"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query() {
        return "books";
      },
      providesTags: ["books"],
    }),
    getUserBooks: builder.query<Book[], number>({
      query(userId) {
        return `users/${userId}/books`;
      },
    }),
    getBookById: builder.query<Book, number>({
      query(id) {
        return `books/${id}`;
      },
      providesTags: ["books"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(startLoading())
        try {
          await queryFulfilled;
        } catch (err) {
          const error = err as BackendError;
          dispatch(showAlert({ message: error.error.data.message ?? "Book not found", severity: "error" }))
        }
        dispatch(stopLoading());
      }
    }),
    createBook: builder.mutation<Book, FormData>({
      query(data) {
        return {
          url: "books",
          method: "POST",
          body: data,
          //credentials: "include"
        };
      },
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation<Book, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `books/${id}`,
          method: "PATCH",
          body: formData,
          //credentials: "include"
        };
      },
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<null, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: "DELETE",
          //credentials: "include"
        };
      },
      invalidatesTags: ["books"],
    }),
    getBookReviews: builder.query<Review[], number>({
      query(bookId) {
        return `books/${bookId}/reviews`;
      },
      providesTags: ["reviews"],
    }),
    addReview: builder.mutation<Review, AddReview>({
      query(data) {
        return {
          url: `reviews`,
          method: "POST",
          body: data,
          //credentials: "include"
        };
      },
      invalidatesTags: ["reviews", "books"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(listsApi.util.invalidateTags(["lists"]));
        } catch (e) {
          dispatch(
            showAlert({ message: "Error adding review", severity: "error" })
          );
        }
      },
    }),
    editReviewContent: builder.mutation<Review, EditReviewContentPayload>({
      query(data) {
        return {
          url: `reviews/${data.id}`,
          method: "PATCH",
          body: data,
          //credentials: "include"
        };
      },
      invalidatesTags: ["reviews"],
    }),
    editReviewRating: builder.mutation<Review, EditReviewRatingPayload>({
      query(data) {
        return {
          url: `reviews/${data.id}/rating`,
          method: "PATCH",
          body: data,
          //credentials: "include"
        };
      },
      invalidatesTags: ["reviews", "books"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(listsApi.util.invalidateTags(["lists"]));
        } catch (e) {
          dispatch(
            showAlert({
              message: "Error editing review rating",
              severity: "error",
            })
          );
        }
      },
    }),
    deleteReview: builder.mutation<Review, number>({
      query(reviewId) {
        return {
          url: `reviews/${reviewId}`,
          method: "DELETE",
          //credentials: "include"
        };
      },
      invalidatesTags: ["reviews", "books"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(listsApi.util.invalidateTags(["lists"]));

          dispatch(
            showAlert({ message: "Review is deleted", severity: "success" })
          );
        } catch (e) {
          dispatch(
            showAlert({ message: "Error deleting review", severity: "error" })
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetBookReviewsQuery,
  useAddReviewMutation,
  useEditReviewContentMutation,
  useEditReviewRatingMutation,
  useDeleteReviewMutation,
} = booksApi;
