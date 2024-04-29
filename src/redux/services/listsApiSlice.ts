import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config";
import { List, createListPayload } from "../../Types/listTypes";

export const listsApi = createApi({
    reducerPath: "listApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["lists"],
    endpoints: (builder) => ({
        // ? Query: Get All lists
        getLists: builder.query<List[], void>({
            query() {
                return "lists";
            },
        }),
        // ? Query: Get a single list
        getList: builder.query<List, string>({
            query(id) {
                return `lists/${id}`;
            },
        }),
        // ? Mutation: Create a list
        createList: builder.mutation<List, createListPayload>({
            query(data) {
                return {
                    url: "lists",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ['lists']
        }),
        // ? Mutation: Update list
        updateList: builder.mutation<List, { id: string; formData: FormData }>({
            query({ id, formData }) {
                return {
                    url: `lists/${id}`,
                    method: "PATCH",
                    body: formData,
                };
            },
        }),
        // ? Mutation: Delete list
        deleteList: builder.mutation<null, string>({
            query(id) {
                return {
                    url: `lists/${id}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {
    useCreateListMutation,
    useUpdateListMutation,
    useDeleteListMutation,
    useGetListsQuery,
    useGetListQuery,
} = listsApi;
