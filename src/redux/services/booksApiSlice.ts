import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { Book } from "../../Types/bookTypes";

export const booksApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    // ? Query: Get All books
    getBooks: builder.query<Book[], void>({
      query() {
        return "books";
      },
    }),
    // ? Query: Get a single book
    getBook: builder.query<Book, string>({
      query(id) {
        return `books/${id}`;
      },
    }),
    // ? Mutation: Create a book
    createBook: builder.mutation<Book, FormData>({
      query(data) {
        return {
          url: "books",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
    }),
    // ? Mutation: Update book
    updateBook: builder.mutation<Book, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `books/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    // ? Mutation: Delete book
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
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
} = booksApi;
