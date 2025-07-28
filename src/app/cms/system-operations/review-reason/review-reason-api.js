import { apiSlice } from "@/features/api";

export const ReviewReasonApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ReviewReason"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteReviewReason: builder.mutation({
        query: (data) => ({
          url: `/system-operations/api/ReviewReason/${data.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ReviewReason"],
      }),
      addReviewReason: builder.mutation({
        query: (data) => ({
          url: "/system-operations/api/ReviewReason",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["ReviewReason"],
      }),
      getReviewReasonById: builder.query({
        query: (id) => ({
          url: `/system-operations/api/ReviewReason/${id}`,
          method: "GET",
          // providesTags: ["ReviewReason"],
        }),
        providesTags: ["ReviewReason"],
      }),
      updateReviewReason: builder.mutation({
        query: (data) => ({
          url: `/system-operations/api/ReviewReason/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["ReviewReason"],
      }),
    }),
  });

export const {
  useAddReviewReasonMutation,
  useDeleteReviewReasonMutation,
  useGetReviewReasonByIdQuery,
  useLazyGetReviewReasonByIdQuery,
  useUpdateReviewReasonMutation,
} = ReviewReasonApiSlice;
