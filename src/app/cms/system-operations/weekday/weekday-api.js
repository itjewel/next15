import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const WeekdayApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["weekday"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getWeekdays: builder.query({
        query: () => ({
          url: `${Api.GetListOfWeekDay}`,
        }),
        providesTags: ["weekday"],
      }),
      weekdaySearch: builder.query({
        query: () => ({
          url: `${Api.GetListOfWeekDay}`,
        }),
        providesTags: ["weekday"],
      }),
      getWeekdaysId: builder.query({
        query: (id) => ({
          url: `${Api.GetIdOfWeekDay}${id}`,
        }),
      }),
      createWeekday: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateWeekDay}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["weekday"],
      }),
      updateWeekdayById: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateWeekday}${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["weekday"],
      }),
      deleteWeekdayById: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveWeekDay}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["weekday"],
      }),
    }),
  });

export const {
  useGetWeekdaysQuery,
  useLazyGetWeekdaysQuery,
  useGetWeekdaysIdQuery,
  useLazyGetWeekdaysIdQuery,
  useWeekdaySearchQuery,
  useLazyWeekdaySearchQuery,
  useCreateWeekdayMutation,
  useUpdateWeekdayByIdMutation,
  useDeleteWeekdayByIdMutation,
} = WeekdayApiSlice;
