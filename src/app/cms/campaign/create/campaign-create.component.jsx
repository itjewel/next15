import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";

import { FormikContext, useFormik } from "formik";
import { CampaignCreateForm } from "./campaign-create-form.component";
import {
  InitialValues,
  UpdateValidationSchema,
  ValidationSchema,
  makeValues,
  useInitialValues,
} from "./form.config";

import {
  useGetAllBranchesQuery,
  useGetAllCitiesQuery,
  useGetAllRestaurantsQuery,
  useGetAllZonesQuery,
} from "@/features/api/common-api-hooks";

import { PageLoader } from "@/features/ui/page-loader.component";
import { convertToFormData } from "@/helper";
import { cloneDeep, pick } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateCampaignMutation,
  useGetCampaignReferenceTypeQuery,
  useLazyGetSingleCampaignQuery,
  useUpdateCampaignMutation,
} from "../campaign-api-slice";

const pickPayloadObj = [
  "name",
  "description",
  "referenceTypeId",
  "fileImage",
  "bannerFileImage",
  "startDate",
  "endDate",
  "startTime",
  "endTime",
  "discountInPercent",
  "discountInAmount",
  "isInTop",
  "isPickup",
  "isDelivery",
  "isDineIn",
  "isFlower",
];

export const CampaignCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteImage, setDelete] = useState(false);

  const { data: refType, isLoading: refTypeIsLoading } =
    useGetCampaignReferenceTypeQuery();

  const { data: allCities, isLoading: allCitiesIsLoading } =
    useGetAllCitiesQuery();

  const { data: allRestaurantOptions, isLoading: allRestaurantIsLoading } =
    useGetAllRestaurantsQuery();

  const { data: allZonesOptions, isLoading: allZoneIsLoading } =
    useGetAllZonesQuery();

  const { data: allBrancheOptions, isLoading: allBranchLoading } =
    useGetAllBranchesQuery();

  const breadcrumbItems = [
    { name: `${lang("campaign")}`, url: routeNames.campaign },
    { name: id ? "Update" : "Create" },
  ];
  const [
    createCampain,
    {
      data: addData,
      isSuccess: addSuccess,
      isError: addErrorStatus,
      error: addErrorData,
    },
  ] = useCreateCampaignMutation();

  const [
    getCampaignById,
    {
      data: singleCampain,
      isSuccess: campainSuccess,
      isLoading: campainIsLoading,
      isError: campainError,
      error: campainErrorData,
    },
  ] = useLazyGetSingleCampaignQuery();

  const [
    updateCampain,
    {
      data: editData,
      isSuccess: editSuccess,
      isError: editErrorStatus,
      error: editErrorData,
    },
  ] = useUpdateCampaignMutation();

  useEffect(() => {
    if (campainError) {
      toast.error(campainErrorData?.data?.message);
    }
  }, [id, campainError]);

  useEffect(() => {
    if (id) {
      getCampaignById(id);
    }
  }, [id]);

  const getInitialValues = useInitialValues(
    singleCampain,
    allRestaurantOptions,
    allBrancheOptions,
    allCities,
    allZonesOptions
  );

  const onSubmit = async (values) => {
    const refIdKeyMap = {
      4: "branchId",
      2: "zoneId",
      3: "restaurantId",
    };

    const refId =
      (values.referenceTypeId &&
        values[refIdKeyMap[values.referenceTypeId]]?.map((item) =>
          Number(item?.value)
        )) ||
      [];

    const pickObj = pick(values, pickPayloadObj);

    const formData = convertToFormData(
      cloneDeep(
        makeValues(
          (values = {
            ...pickObj,
            referenceIds: refId,
            isDeleteImage: deleteImage,
            discountInPercent:
              values.discountType === "percent" ? values.discountInPercent : 0,
            discountInAmount:
              values.discountType === "amount" ? values.discountInAmount : 0,
          }),
          id
        )
      )
    );

    id
      ? await updateCampain({ id, data: formData })
      : await createCampain(formData);
  };

  const ctx = useFormik({
    enableReinitialize: true,
    initialValues: id && campainSuccess ? getInitialValues : InitialValues,
    validationSchema: id ? UpdateValidationSchema : ValidationSchema,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      navigate("/campaign");
    }
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      navigate("/campaign");
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  const renderContent = () => {
    if (
      campainIsLoading ||
      refTypeIsLoading ||
      allCitiesIsLoading ||
      allRestaurantIsLoading ||
      allZoneIsLoading ||
      allBranchLoading
    ) {
      return <PageLoader />;
    }

    if (campainError) {
      return (
        <div className="d-flex justify-content-center">
          <p>No Data Found</p>
        </div>
      );
    }

    return (
      <FormikContext.Provider value={ctx}>
        <CampaignCreateForm
          setDelete={setDelete}
          refType={refType}
          allCities={allCities}
          restaurants={allRestaurantOptions}
          allZonesOptions={allZonesOptions}
          allBrancheOptions={allBrancheOptions}
          apiErrors={addErrorData || editErrorData}
        />
      </FormikContext.Provider>
    );
  };

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton to={routeNames.campaign} btnName={lang("back")} />}
      title={id ? "Update campaign" : "Create campaign"}
    >
      {renderContent()}
    </CommonLayout>
  );
};
