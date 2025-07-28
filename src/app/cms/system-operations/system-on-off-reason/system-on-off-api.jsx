import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const systemOnOffReasonSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["system-on-off-reason"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSystemOnOffReasonList: builder.query({
        query: () => ({
          url: `${Api.GetReasonListOfSystemOnOff}`,
        }),
      }),
      getSystemOnOffReasonId: builder.query({
        query: (id) => ({
          url: `${Api.GetReasonIdOfSystemOnOff}${id}`,
        }),
      }),
      createReasonOfSystemOnOff: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateReasonOfSystemOnOff}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["system-on-off-reason"],
      }),
      updateReasonOfSystemOnOff: builder.mutation({
        query: ({ id, formData }) => ({
          url: `${Api.UpdateListOfSystemOnOff}${id}`,
          method: "PUT",
          body: formData,
        }),
      }),

      deleteReasonOfSystemOnOff: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveListOfSystemOnOff}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["system-on-off-reason"],
      }),
    }),
  });

export const {
  useGetSystemOnOffReasonListQuery,
  useLazyGetSystemOnOffReasonListQuery,
  useGetSystemOnOffReasonIdQuery,
  useLazyGetSystemOnOffReasonIdQuery,
  useCreateReasonOfSystemOnOffMutation,
  useUpdateReasonOfSystemOnOffMutation,
  useDeleteReasonOfSystemOnOffMutation,
} = systemOnOffReasonSlice;
