import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { AddReview, Book, Review } from "../../Types/books.types";
import { showAlert } from "../features/alerts/alertsSlice";

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
      providesTags: [],
    }),
    createBook: builder.mutation<Book, FormData>({
      query(data) {
        return {
          url: "books",
          method: "POST",
          body: data,
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
        };
      },
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<null, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: "DELETE",
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
        };
      },
      invalidatesTags: ["reviews"],
    }),
    deleteReview: builder.mutation<Review, number>({
      query(reviewId) {
        return {
          url: `reviews/${reviewId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["reviews"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
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
  useDeleteReviewMutation,
} = booksApi;
