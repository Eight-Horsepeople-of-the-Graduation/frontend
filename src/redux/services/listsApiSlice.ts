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
  tagTypes: ["lists"],
  endpoints: (builder) => ({
    getAllLists: builder.query<List[], void>({
      query() {
        return "bookshelves";
      },
      providesTags: ["lists"]
    }),
    getListById: builder.query<List, number>({
      query(id) {
        return `bookshelves/${id}`;
      },
      providesTags: ["lists"]
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
      query({ id, listData }) {
        return {
          url: `bookshelves/${id}`,
          method: "PUT",
          body: listData,
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
    addBookToList: builder.mutation<null, { listId: number; bookIds: number[] }>({
      query({ listId, bookIds }) {
        return {
          url: `bookshelves/add-books/${listId}`,
          method: "PATCH",
          body: { bookIds },
        };
      },
      invalidatesTags: ["lists"],
    }),
    removeBookFromList: builder.mutation<
      null,
      { listId: number; bookIds: number[] }
    >({
      query({ listId, bookIds }) {
        return {
          url: `bookshelves/remove-books/${listId}`,
          method: "PATCH",
          body: { bookIds },
        };
      },
      invalidatesTags: ["lists"],
    }),
    getUserLists: builder.query<List[], number>({
      query(userId) {
        return `bookshelves/user/${userId}`;
      },
      providesTags: ["lists"]
    }),
  }),
});

export const {
  useCreateListMutation,
  useEditListMutation,
  useDeleteListMutation,
  useGetAllListsQuery,
  useGetListByIdQuery,
  useAddBookToListMutation,
  useRemoveBookFromListMutation,
  useGetUserListsQuery,
} = listsApi;
