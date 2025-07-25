import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const SpecialhourOfApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["specialhour"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSpecialHourType: builder.query({
        query: () => ({
          url: `${Api.GetListOfSpecialHourType}`,
        }),
        providesTags: ["specialHourType"],
      }),

      getSpecialHourTypeId: builder.query({
        query: (id) => ({
          url: `${Api.GetIdOfSpecialHourType}${id}`,
        }),
      }),
      createSpecialHourType: builder.mutation({
        query: (payload) => ({
          url: `${Api.CreateSpecialHourType}`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["specialHourType"],
      }),
      updateSpecialHourType: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateSpecialHourType}${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["specialHourType"],
      }),
      deleteSpecialHourType: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveSpecialHourType}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["specialHourType"],
      }),
    }),
  });

export const {
  useGetSpecialHourTypeQuery,
  useLazyGetSpecialHourTypeQuery,
  useGetSpecialHourTypeIdQuery,
  useLazyGetSpecialHourTypeIdQuery,
  useCreateSpecialHourTypeMutation,
  useUpdateSpecialHourTypeMutation,
  useDeleteSpecialHourTypeMutation,
} = SpecialhourOfApiSlice;
