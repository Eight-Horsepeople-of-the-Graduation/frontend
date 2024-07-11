import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { Book, Review } from "../../Types/books.types";

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
    getBookReviews: builder.query<Review[], number>({
      query(bookId) {
        return `books/${bookId}/reviews`;
      },
      providesTags: ["reviews"],
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
          method: "PUT",
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
} = booksApi;
