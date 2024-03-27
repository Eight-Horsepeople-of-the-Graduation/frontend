import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../../../Types/bookTypes";
import { baseUrl } from "../../config";

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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "books" as const,
                id,
              })),
              { type: "books", id: "LIST" },
            ]
          : [{ type: "books", id: "LIST" }],
      // ? Transform the result to prevent nested data
      transformResponse: (response: { data: { books: Book[] } }) =>
        response.data.books,
    }),
    // ? Query: Get a single book
    getBook: builder.query<Book, string>({
      query(id) {
        return `books/${id}`;
      },
      transformResponse: (response: { data: { book: Book } }, _args, _meta) =>
        response.data.book,
      providesTags: (_result, _error, id) => [{ type: "books", id }],
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
      invalidatesTags: [{ type: "books", id: "LIST" }],
      transformResponse: (response: { data: { book: Book } }) =>
        response.data.book,
    }),
    // ? Mutation: Update book
    updateBook: builder.mutation<Book, { id: string; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `books/${id}`,
          method: "PATCH",
          credentials: "include",
          body: formData,
        };
      },
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: "books", id },
              { type: "books", id: "LIST" },
            ]
          : [{ type: "books", id: "LIST" }],
      transformResponse: (response: { data: { book: Book } }) =>
        response.data.book,
    }),
    // ? Mutation: Delete book
    deleteBook: builder.mutation<null, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "books", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
  usePrefetch,
} = booksApi;
