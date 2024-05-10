import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  List,
  createListPayload,
  updateListPayload,
} from "../../Types/lists.types";

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
    editList: builder.mutation<
      List,
      { id: number; listData: updateListPayload }
    >({
      query({ id, listData: formData }) {
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
    removeBookFromList: builder.mutation<
      null,
      { listId: number; bookId: number }
    >({
      query({ listId, bookId }) {
        return {
          url: `bookshelves/add-book/${listId}`,
          method: "DELETE",
          body: { bookId },
        };
      },
      invalidatesTags: ["lists", "books"],
    }),
    updateBookLists: builder.mutation<
      null,
      {
        addedListsIds: number[];
        removedListsIds: number[];
        bookId: number;
      }
    >({
      query({
        addedListsIds: addedBookshelvesIds,
        removedListsIds: removedBookshelvesIds,
        bookId,
      }) {
        return {
          url: `bookshelves/add-book`,
          method: "POST",
          body: { bookId, addedBookshelvesIds, removedBookshelvesIds },
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
  useRemoveBookFromListMutation,
  useUpdateBookListsMutation,
} = listsApi;
