import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const riderTutorialApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["rider-tutorial"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createRiderTutorial: builder.mutation({
        query: (payload) => {
          return {
            url: Api.RiderTutorialListCreate,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["rider-lesson"],
      }),
      updateRiderTutorial: builder.mutation({
        query: ({ id, formData }) => ({
          url: `${Api.RiderTutorialListUpdate}${id}`,
          method: "PUT",
          body: formData,
        }),
        invalidatesTags: ["rider-tutorial-update"],
      }),
      riderTutorialID: builder.query({
        query: (id) => ({
          url: `${Api.RiderTutorialListID}${id}`,
          method: "GET",
        }),
      }),
      deleteRiderTutorial: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveRidertutorialList}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["rider-tutorial-remove"],
      }),
    }),
  });

export const {
  useLazyRiderTutorialIDQuery,
  useCreateRiderTutorialMutation,
  useUpdateRiderTutorialMutation,
  useDeleteRiderTutorialMutation,
} = riderTutorialApiSlice;
