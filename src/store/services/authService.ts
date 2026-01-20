import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/me",
    }),
  }),
})
export const { useGetProfileQuery } = authApi;
