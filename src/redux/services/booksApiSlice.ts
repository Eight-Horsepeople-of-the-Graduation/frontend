import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { Book } from "../../Types/bookTypes";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query() {
        return "books";
      },
    }),
    getBookById: builder.query<Book, number>({
      query(id) {
        return `books/${id}`;
      },
    }),
    getBookByTitle: builder.query<Book, string>({
      query(title) {
        return `books/title/${title}`;
      },
    }),
    createBook: builder.mutation<Book, FormData>({
      query(data) {
        return {
          url: "books",
          method: "POST",
          body: data,
        };
      },
    }),
    editBook: builder.mutation<Book, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `books/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteBook: builder.mutation<null, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useGetBookByTitleQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = booksApi;
