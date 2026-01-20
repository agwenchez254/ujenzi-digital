import type { Contact } from "@/@types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "contacts",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "contact" as const, id })), { type: "contact", id: "LIST" }]
          : [{ type: "contact", id: "LIST" }],
    }),
    getContactById: builder.query<Contact, string>({
      query: (id) => `contacts/${id}`,
    }),
    addContact: builder.mutation<void, Contact>({
      query: (body) => ({
        url: "contacts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "contact", id: "LIST" }],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: (body) => ({
        url: `contacts/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "contact", id }],

    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "contact", id }],
    }),
  }),
});

export const { useGetContactsQuery, useGetContactByIdQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } = contactsApi;