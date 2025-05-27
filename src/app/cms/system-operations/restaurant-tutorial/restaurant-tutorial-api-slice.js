import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const restaurantTutorialApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["restaurant-tutorial"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createRestaurantTutorial: builder.mutation({
        query: (payload) => {
          return {
            url: Api.RestaurantTutorialCreate,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Restaurant-lesson"],
      }),
      updateRestaurantTutorial: builder.mutation({
        query: ({ id, formData }) => ({
          url: `${Api.RestaurantTutorialUpdate}${id}`,
          method: "PUT",
          body: formData,
        }),
        invalidatesTags: ["Restaurant-lesson"],
      }),
      restaurantTutorialID: builder.query({
        query: (id) => ({
          url: `${Api.RestaurantTutorialListID}${id}`,
          method: "GET",
        }),
      }),
      deleteRestaurantTutorial: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveRestaurantTutorialID}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Restaurant-lesson"],
      }),
    }),
  });

export const {
  useLazyRestaurantTutorialIDQuery,
  useCreateRestaurantTutorialMutation,
  useUpdateRestaurantTutorialMutation,
  useDeleteRestaurantTutorialMutation,
} = restaurantTutorialApiSlice;
