import {
  useGetAllCitiesQuery,
  useGetAllRestaurantsQuery,
} from "@/features/api";
import { CommonLayout } from "@/features/layouts";
import { useLazyBranchByRestaurantAndZoneIdQuery } from "@/features/promo-code/create/new-promo-code-api-slice";
import { useLazyGetZoneByCityIdsQuery } from "@/features/promo-code/promo-code-api-slice";
import { LinkButton } from "@/features/ui";
import { FormikContext, useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateDeactivationSetupMutation,
  useGetBranchAvailabilityStatusQuery,
  useLazyGetBranchDeactivationByIdQuery,
  useLazyGetDeactivationSetupByIdQuery,
  useSelectTypesQuery,
  useUpdateBranchDeactivationMutation,
  useUpdateDeactivationSetupMutation,
} from "./api-slice";
import { DeactivationForm } from "./deactivation-form.component";
import { ValidationSchema, initialFormValues } from "./form.config";

export const RestaurantDeactivation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [isBranchDeactivation, setIsBranchDeactivation] = useState(true);

  // Extract tabType from query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setIsBranchDeactivation(query.get("tabType") === "branch");
  }, [location]);

  const { data: typeOptions } = useSelectTypesQuery();
  const { data: allCitiesOptions } = useGetAllCitiesQuery();
  const { data: branchAvailabilityStatusOptions } =
    useGetBranchAvailabilityStatusQuery();
  const [zoneTrigger, { data: allZonesOptions, isLoading: allZoneIsLoading }] =
    useLazyGetZoneByCityIdsQuery();
  const { data: allRestaurantOptions, isLoading: allRestaurantIsloading } =
    useGetAllRestaurantsQuery();
  const [
    getBranchByRestaurantAndzones,
    { data: allBrancheOptions, isLoading: allBranchLoading },
  ] = useLazyBranchByRestaurantAndZoneIdQuery();

  const [
    singleGetTrigger,
    { data: singleGetData, isLoading: singleGetDataLoading },
  ] = useLazyGetDeactivationSetupByIdQuery();

  const [
    singleBranchGetTrigger,
    { data: singleBranchGetData, isLoading: singleBranchGetDataLoading },
  ] = useLazyGetBranchDeactivationByIdQuery();

  const [
    createDeactivationSetup,
    { data: createData, error: createDataError },
  ] = useCreateDeactivationSetupMutation();
  const [
    updateDeactivationSetup,
    { data: updateData, error: updateDataError },
  ] = useUpdateDeactivationSetupMutation();

  const [
    updateBranchDeactivationSetup,
    { data: updateBranchData, error: updateBranchDataError },
  ] = useUpdateBranchDeactivationMutation();

  const editInitValues = isBranchDeactivation
    ? {
        branchName: singleBranchGetData?.data?.branchName || "",
        reason: singleBranchGetData?.data?.reason || "",
        branch: singleBranchGetData?.data?.branchId
          ? [
              {
                value: singleBranchGetData?.data?.branchId,
                label: singleBranchGetData?.data?.branchName,
              },
            ]
          : [],
        branchAvailabilityStatusId:
          singleBranchGetData?.data?.branchAvailabilityStatusId || "",
        startDate: singleBranchGetData?.data?.startTime
          ? moment(singleBranchGetData?.data?.startTime).format(
              "YYYY-MM-DDTHH:mm:ss"
            )
          : "",
        endDate: singleBranchGetData?.data?.endTime
          ? moment(singleBranchGetData?.data?.endTime).format(
              "YYYY-MM-DDTHH:mm:ss"
            )
          : "",
        description: singleBranchGetData?.data?.description || "",
      }
    : {
        reason: singleGetData?.data?.reason || "",
        type: singleGetData?.data?.referenceTypeId ?? "",
        city: singleGetData?.data?.cityIds
          ? allCitiesOptions?.items?.filter((item) =>
              singleGetData?.data?.cityIds?.includes(item?.value)
            )
          : [],
        zone: singleGetData?.data?.zoneIds
          ? allZonesOptions?.data?.filter((item) =>
              singleGetData?.data?.zoneIds?.includes(item?.value)
            )
          : [],
        restaurant:
          singleGetData?.data?.restaurants?.map((item) => ({
            label: item.name,
            value: item.id,
          })) || [],
        branch:
          singleGetData?.data?.branches?.map((item) => ({
            label: item.name,
            value: item.id,
          })) || [],
        startDate: singleGetData?.data?.startDate
          ? moment(singleGetData?.data?.startDate).format("YYYY-MM-DDTHH:mm:ss")
          : "",
        endDate: singleGetData?.data?.endDate
          ? moment(singleGetData?.data?.endDate).format("YYYY-MM-DDTHH:mm:ss")
          : "",

        description: singleGetData?.data?.description || "",
      };

  const formik = useFormik({
    initialValues: id ? editInitValues : initialFormValues,
    validationSchema: ValidationSchema(isBranchDeactivation),
    enableReinitialize: true,
    async onSubmit(values) {
      let payload = isBranchDeactivation
        ? {
            branchId: values?.branch[0]?.value,
            branchAvailabilityStatusId: values.branchAvailabilityStatusId,
            startTime: moment(values?.startDate).toISOString(),
            endTime: moment(values?.endDate).toISOString(),
            reason: values?.reason,
            description: values?.description,
          }
        : {
            startDate: moment(values?.startDate).toISOString(),
            endDate: moment(values?.endDate).toISOString(),
            reason: values?.reason,
            description: values?.description,
            systemOnOffSettingMappings: (() => {
              if (values?.type == 0) {
                return [
                  {
                    systemOnOffSettingId: id ? id : 0,
                    referenceId: 0,
                    referenceTypeId: 0,
                    isActive: true,
                  },
                ];
              } else if (values?.branch[0]?.value && values?.type == 4) {
                return values?.branch?.map((item) => ({
                  systemOnOffSettingId: id ? id : 0,
                  referenceId: item?.value,
                  referenceTypeId: 4,
                  isActive: true,
                }));
              } else if (values?.restaurant[0]?.value && values?.type == 3) {
                return values?.restaurant?.map((item) => ({
                  systemOnOffSettingId: id ? id : 0,
                  referenceId: item?.value,
                  referenceTypeId: 3,
                  isActive: true,
                }));
              } else if (values?.zone[0]?.value && values?.type == 2) {
                return values?.zone?.map((item) => ({
                  systemOnOffSettingId: id ? id : 0,
                  referenceId: item?.value,
                  referenceTypeId: 2,
                  isActive: true,
                }));
              } else {
                return values?.city?.map((item) => ({
                  systemOnOffSettingId: id ? id : 0,
                  referenceId: item?.value,
                  referenceTypeId: 1,
                  isActive: true,
                }));
              }
            })(),
          };

      if (id) {
        if (isBranchDeactivation) {
          await updateBranchDeactivationSetup({ id, payload });
        } else {
          await updateDeactivationSetup({ id, payload });
        }
      } else {
        await createDeactivationSetup(payload);
      }
      navigate("/restaurant-activation-deactivation");
    },
  });

  useEffect(() => {
    if (id && !singleGetDataLoading) {
      if (isBranchDeactivation) {
        singleBranchGetTrigger(id);
      } else {
        singleGetTrigger(id);
      }
    }
  }, [id, isBranchDeactivation]);

  useEffect(() => {
    if (formik.values?.city?.length) {
      const cityIds = formik.values?.city?.map((c) => c?.value) || [];
      zoneTrigger(cityIds);
    }
  }, [formik.values?.city]);

  useEffect(() => {
    if (formik.values?.restaurant?.length && formik.values?.zone?.length) {
      const restaurantIds = formik.values?.restaurant?.map((c) => c?.value);
      const zoneIds = formik.values?.zone?.map((c) => c?.value);
      getBranchByRestaurantAndzones({ restaurantIds, zoneIds });
    }
  }, [formik.values?.restaurant, formik.values?.zone]);

  useEffect(() => {
    if (createData) {
      toast.success(createData?.message);
    }
    if (createDataError) {
      toast.error(createDataError?.data?.message);
    }
  }, [createData, createDataError]);

  useEffect(() => {
    if (updateData || updateBranchData) {
      toast.success(updateData?.message || updateBranchData?.message);
      navigate("/restaurant-activation-deactivation");
    }
    if (updateDataError || updateBranchDataError) {
      toast.error(
        updateDataError?.data?.message || updateBranchDataError?.data?.message
      );
    }
  }, [updateData, updateBranchData, updateDataError, updateBranchDataError]);

  return (
    <CommonLayout
      title={
        id
          ? `Update ${
              isBranchDeactivation ? "branch" : "restaurant"
            } deactivation setup`
          : `${
              isBranchDeactivation ? "Branch" : "Restaurant"
            } deactivation setup`
      }
      BtnComp={
        <LinkButton btnName="Back" to="/restaurant-activation-deactivation" />
      }
    >
      <FormikContext.Provider value={formik}>
        <DeactivationForm
          selectType={typeOptions?.data}
          allCitiesOptions={allCitiesOptions}
          allZonesOptions={allZonesOptions}
          allRestaurantOptions={allRestaurantOptions}
          allBrancheOptions={allBrancheOptions}
          branchAvailabilityStatusOptions={branchAvailabilityStatusOptions}
          isBranchDeactivation={isBranchDeactivation}
        />
      </FormikContext.Provider>
    </CommonLayout>
  );
};
