import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
import { changeResponseForOption } from "@/helper";

const deactivationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectTypes: builder.query({
      query: () => Api.GetReferenceTypeOptions,
      transformResponse: changeResponseForOption,
    }),
    getDeactivationSetupById: builder.query({
      query: (id) => `${Api.CreateDeactivationSetup}/${id}`,
    }),
    createDeactivationSetup: builder.mutation({
      query: (body) => ({
        url: Api.CreateDeactivationSetup,
        method: "POST",
        body,
      }),
    }),
    updateDeactivationSetup: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `${Api.UpdateDeactivationSetup}/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    getBranchDeactivationById: builder.query({
      query: (id) => `/restaurants/api/BranchOpenCloseHistory/${id}`,
    }),
    updateBranchDeactivation: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/restaurants/api/BranchOpenCloseHistory/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    activateBranch: builder.mutation({
      query: ({ branchId }) => ({
        url: `/restaurants/api/BranchOpenCloseHistory/MakeBranchAvailableFromAdmin/${branchId}`,
        method: "PUT",
      }),
    }),
    getBranchAvailabilityStatus: builder.query({
      query: () => "/restaurants/api/BranchOpenCloseHistory/GetAllStatus",
    }),
    deleteDeactivationType: builder.mutation({
      query: (data) => ({
        url: `/restaurants/api/SystemOnOff/${
          data.id
        }?isActive=${!data?.isActive}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSelectTypesQuery,
  useLazyGetDeactivationSetupByIdQuery,
  useCreateDeactivationSetupMutation,
  useUpdateDeactivationSetupMutation,
  useDeleteDeactivationTypeMutation,
  useLazyGetBranchDeactivationByIdQuery,
  useUpdateBranchDeactivationMutation,
  useActivateBranchMutation,
  useGetBranchAvailabilityStatusQuery,
} = deactivationSlice;
