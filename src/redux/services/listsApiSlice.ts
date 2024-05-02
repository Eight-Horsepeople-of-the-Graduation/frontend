import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { List, createListPayload } from "../../Types/listTypes";

export const listsApi = createApi({
  reducerPath: "listsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["lists", "books"],
  endpoints: (builder) => ({
    getAllLists: builder.query<List[], void>({
      query() {
        return "bookshelves";
      },
    }),
    getListById: builder.query<List, number>({
      query(id) {
        return `bookshelves/${id}`;
      },
    }),
    getListByTitle: builder.query<List, string>({
      query(title) {
        return `bookshelves/title/${title}`;
      },
    }),
    createList: builder.mutation<List, createListPayload>({
      query(data) {
        return {
          url: "bookshelves",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["lists"],
    }),
    editList: builder.mutation<List, { id: number; formData: FormData }>({
      query({ id, formData }) {
        return {
          url: `bookshelves/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["lists"],
    }),
    deleteList: builder.mutation<null, string>({
      query(id) {
        return {
          url: `bookshelves/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["lists"],
    }),
    addBookToList: builder.mutation<null, { listId: number; bookId: number }>({
      query({ listId, bookId }) {
        return {
          url: `bookshelves/add-book/${listId}`,
          method: "POST",
          body: { bookId },
        };
      },
      invalidatesTags: ["lists", "books"],
    }),
  }),
});

export const {
  useCreateListMutation,
  useEditListMutation,
  useDeleteListMutation,
  useGetAllListsQuery,
  useGetListByIdQuery,
  useGetListByTitleQuery,
  useAddBookToListMutation,
} = listsApi;
