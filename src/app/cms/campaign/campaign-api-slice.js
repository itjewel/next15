import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const campaignSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Campaign"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCampaign: builder.mutation({
        query: (payload) => {
          return {
            url: Api.Campaign,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Campaign"],
      }),
      getSingleCampaign: builder.query({
        query: (id) => ({
          url: `${Api.Campaign}/${id}`,
          method: "GET",
        }),
      }),
      getCampaignReferenceType: builder.query({
        query: () => "/restaurants/api/Campaign/GetCampaignReferenceTypeList",
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
      updateCampaign: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `${Api.Campaign}/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["Campaign"],
      }),
      deleteCampaign: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.Campaign}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Campaign"],
      }),
    }),
  });

export const {
  useCreateCampaignMutation,
  useLazyGetSingleCampaignQuery,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
  useGetCampaignReferenceTypeQuery,
} = campaignSlice;
