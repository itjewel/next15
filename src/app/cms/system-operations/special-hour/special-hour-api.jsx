import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const SpecialHourApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["SpecialHour"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteSpecialHour: builder.mutation({
        query: (data) => ({
          url: `${Api.GetSpecialHourList}/${data?.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SpecialHour"],
      }),
      createSpecialHour: builder.mutation({
        query: (data) => ({
          url: Api.GetSpecialHourList,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["SpecialHour"],
      }),
      editSpecialHour: builder.mutation({
        query: (data) => ({
          url: `${Api.GetSpecialHourList}/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["SpecialHour"],
      }),
      getSpecialHourById: builder.query({
        query: (id) => ({
          url: `${Api.GetSpecialHourList}/${id}`,
          method: "GET",
          providesTags: ["SpecialHour"],
        }),
        
      }),
    }),
  });

export const {
  useCreateSpecialHourMutation,
  useGetSpecialHourByIdQuery,
  useLazyGetSpecialHourByIdQuery,
  useDeleteSpecialHourMutation,
  useEditSpecialHourMutation,
} = SpecialHourApi;
