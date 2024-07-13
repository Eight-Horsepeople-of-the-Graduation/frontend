import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import {
  List,
  createListPayload,
  updateListPayload,
} from "../../Types/lists.types";
import { showAlert } from "../features/alerts/alertsSlice";
import { closeDeleteListModal } from "../features/modals/modalsSlice";
import { readingChallengeApi } from "./readingChallengeApiSlice";

export const listsApi = createApi({
  reducerPath: "listsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["lists"],
  endpoints: (builder) => ({
    getAllLists: builder.query<List[], void>({
      query() {
        return "bookshelves";
      },
      providesTags: ["lists"],
    }),
    getListById: builder.query<List, number>({
      query(id) {
        return `bookshelves/${id}`;
      },
      providesTags: ["lists"],
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
          method: "PATCH",
          body: listData,
        };
      },
      invalidatesTags: ["lists"],
    }),
    deleteList: builder.mutation<null, number>({
      query(id) {
        return {
          url: `bookshelves/${id}`,
          method: "DELETE",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(closeDeleteListModal());
          location.replace("/");
          dispatch(showAlert({ message: "List removed", severity: "success" }));
        } catch (error) {
          dispatch(
            showAlert({ message: "Something went wrong", severity: "error" })
          );
        }
      },
      invalidatesTags: ["lists"],
    }),
    addBookToList: builder.mutation<
      null,
      { listId: number; bookIds: number[] }
    >({
      query({ listId, bookIds }) {
        return {
          url: `bookshelves/add-books/${listId}`,
          method: "PATCH",
          body: { bookIds },
        };
      },
      invalidatesTags: ["lists"],
      onQueryStarted: async (_,{dispatch,queryFulfilled})=>{
        try{
          await queryFulfilled;
          dispatch(readingChallengeApi.util.invalidateTags(["challenges"]));
        }catch(e){
          dispatch(showAlert({message:"Error adding book to list",severity: "error"}))
        }
      }
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
        return `users/${userId}/bookshelves`;
      },
      providesTags: ["lists"],
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
