import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const TimeSlotApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["TimeSlot"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteTimeSlot: builder.mutation({
        query: (data) => ({
          url: `${Api.DeleteTimeSlot}/${data?.id}?isActive=${data?.isActive}`,
          method: "DELETE"
        }),
        invalidatesTags: ["TimeSlot"],
      }),
      getTimeSlotById: builder.query({
        query: (id) => `${Api.GetTimeSlotById}/${id}`,
        providesTags: ["TimeSlot"],
      }),
      addTimeSlot: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateTimeSlot}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["TimeSlot"],
      }),
      updateTimeSlot: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateTimeSlot}/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["TimeSlot"],
      }),
    }),
  });

export const {
  useDeleteTimeSlotMutation,
  useLazyGetTimeSlotByIdQuery,
  useAddTimeSlotMutation,
  useUpdateTimeSlotMutation,
  useGetTimeSlotByIdQuery,
} = TimeSlotApi;
