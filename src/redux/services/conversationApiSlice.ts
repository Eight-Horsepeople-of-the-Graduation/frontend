import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { Conversation } from "../../Types/conversations.types";

export const conversationsApi = createApi({
    reducerPath: "conversationsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["conversations"],
    endpoints: (builder) => ({
        getBookConversation: builder.query<Conversation, { userId: number, bookId: number }>({
            query(data) {
                return `conversations/user/${data.userId}/book/${data.bookId}`;
            }
        }),
    }),
});

export const {
    useGetBookConversationQuery
} = conversationsApi;
