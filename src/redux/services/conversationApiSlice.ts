import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { Conversation } from "../../Types/conversations.types";

export const conversationsApi = createApi({
  reducerPath: "conversationsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["conversations"],
  endpoints: (builder) => ({
    getBookConversation: builder.query<
      Conversation,
      { userId: number; bookId: number }
    >({
      query(data) {
        return {
          url: `conversations/user/${data.userId}/book/${data.bookId}`,
          method: "GET",
          //credentials: "include",
        };
      },
    }),
    sendMessage: builder.mutation<
      { answer: string },
      { userId: number; bookId: number; question: string }
    >({
      query(data) {
        return {
          url: `conversations/chat/user/${data.userId}/book/${data.bookId}`,
          method: "POST",
          body: {
            question: data.question,
          },
          //credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetBookConversationQuery, useSendMessageMutation } =
  conversationsApi;
