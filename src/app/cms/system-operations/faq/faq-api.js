import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const FaqApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Faq"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteFaq: builder.mutation({
        query: (data) => ({
          url: `${Api.DeleteFaq}/${data?.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Faq"],
      }),
      createFaq: builder.mutation({
        query: (data) => ({
          url: Api.AddFaq,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Faq"],
      }),
      editFaq: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateFaq}/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Faq"],
      }),
      getFaqById: builder.query({
        query: (id) => ({
          url: `${Api.GetFaqById}/${id}`,
          method: "GET",
        }),
        providesTags: ["Faq"],
      }),
      getuserTypeOptions: builder.query({
        query: () => ({
          url: Api.GetUserOptions,
          method: "GET",
          transformResponse: (response) => {
            let newResponse = {
              items: response?.data?.map((item) => {
                return {
                  value: item?.id,
                  label: item?.name,
                };
              }),
            };
            return newResponse;
          },
        }),
      }),
      getFAQTypeOptions: builder.query({
        query: () => Api.GetFAQOptions,
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item?.id,
                label: item?.name,
              };
            }),
          };
          return newResponse;
        },
      }),
    }),
  });

export const {
  useDeleteFaqMutation,
  useCreateFaqMutation,
  useEditFaqMutation,
  useGetFaqByIdQuery,
  useLazyGetFaqByIdQuery,
  useGetuserTypeOptionsQuery,
  useGetFAQTypeOptionsQuery,
} = FaqApi;
