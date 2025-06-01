import { validateEndDateTimeGreaterThanStartDateTime } from "@/helper/validation-helper";
import moment from "moment";
import * as yup from "yup";

const formatDateTime = (dateTime) =>
  moment(dateTime).format("YYYY-MM-DD HH:mm:ss");

const filterByIds = (allOptions, selectedItems, idKey = "value") => {
  return allOptions?.filter((item) =>
    selectedItems?.map((val) => val?.id)?.includes(item[idKey])
  );
};

const filterByIncludes = (allOptions, selectedIds, idKey = "value") => {
  return allOptions?.filter((item) => selectedIds?.includes(item[idKey]));
};

export const makeInitialValues = (
  singleCampaign,
  allRestaurantOptions,
  allBrancheOptions,
  allCities,
  allZonesOptions
) => {
  return {
    ...singleCampaign?.data,
    restaurantId: filterByIds(
      allRestaurantOptions?.items,
      singleCampaign?.data?.restaurants
    ),
    fileImage: singleCampaign?.data?.image,
    branchId: filterByIds(
      allBrancheOptions?.items,
      singleCampaign?.data?.branchs
    ),
    cityId: filterByIncludes(allCities?.items, singleCampaign?.data?.cityIds),
    zoneId: filterByIncludes(
      allZonesOptions?.items,
      singleCampaign?.data?.zoneIds
    ),

    startDate: formatDateTime(singleCampaign?.data?.startDate),
    endDate: formatDateTime(singleCampaign?.data?.endDate),
    isInTop: singleCampaign?.data?.isInTop,
  };
};

export const InitialValues = {
  name: "",
  description: "",
  referenceTypeId: "",
  fileImage: "",
  startDate: "",
  endDate: "",
  referenceIds: [],
  cityId: "",
  zoneId: "",
  restaurantId: "",
  branchId: "",
  description: "",
  isInTop: true,
  isDeleteImage: false,
  isPickup: false,
  isDelivery: false,
  isDineIn: false,
  isFlower: false,
};

export const ValidationSchema = yup.object().shape({
  name: yup.string().min(1).trim().required("Name is required"),
  isInTop: yup.boolean(),
  referenceTypeId: yup.string().required("Reference type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .required("End date is required")
    .test(
      "isCloseDateTimeGreaterThanOpenDateTime",
      "Start datetime must be less than end datetime",
      function (value) {
        const { startDate } = this.parent;
        return validateEndDateTimeGreaterThanStartDateTime({
          StartDateTime: startDate,
          EndDateTime: value,
        });
      }
    ),
  zoneId: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .when(
      ["referenceTypeId", "cityId"],
      ([referenceTypeId, cityId], schema) => {
        if (referenceTypeId == 2 && cityId) {
          return yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
              })
            )
            .required("Zone is required");
        }
        if (referenceTypeId == 2 && !cityId)
          return yup.string().required("Select city first");
        return schema;
      }
    ),
  restaurantId: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .when(["referenceTypeId"], ([referenceTypeId], schema) => {
      if (referenceTypeId == 3) {
        return yup
          .array()
          .of(
            yup.object().shape({
              value: yup.string().required(),
              label: yup.string().required(),
            })
          )
          .required("Restaurat is required");
      }

      return schema;
    }),

  branchId: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .when(
      ["referenceTypeId", "cityId", "zoneId", "restaurantId"],
      ([referenceTypeId, cityId, zoneId, restaurantId], schema) => {
        if (referenceTypeId == 4 && !cityId)
          return yup.string().required("Select city");
        if (referenceTypeId == 4 && !zoneId)
          return yup.string().required("Select zone");
        if (referenceTypeId == 4 && !restaurantId)
          return yup.string().required("Select restaurant");
        if (referenceTypeId == 4 && cityId && zoneId && restaurantId) {
          return yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
              })
            )
            .required("Branch is required");
        }
        return schema;
      }
    ),
  fileImage: yup
    .mixed()
    .test("imageSize", "Image size can not be more than 5 mb", (file) => {
      if (file && typeof file == "object") {
        return file.size <= 5 * 1024 * 1024;
      } else {
        return true;
      }
    })
    .test("type", "We only support jpeg, jpg and png format", (value) => {
      if (!value || typeof value == "string") {
        return true;
      }
      return (
        value &&
        (value.type === "image/jpg" ||
          value.type === "image/jpeg" ||
          value.type === "image/png")
      );
    }),
  description: yup
    .string()
    .required("Description is a required field")
    .trim()
    .min(1, "Minmimum one charecter required"),
});

export const makeValues = (values, id) => {
  const val = Object.entries(values).reduce((data, [key, value]) => {
    if (key === "branchAndCampaigns") {
      data.BranchAndCampaigns = value.map((item) => {
        return {
          id: item.id,
          branchId: item.branchId?.length
            ? item.branchId[0]?.value
            : item.branchId?.value,
          campaignId: id ? id : item.campaignId,
        };
      });
    } else if (key === "image") {
      data.FileImage = value;
    } else if (key === "startDate" || key === "endDate") {
      data[key] = moment(value).toISOString();
    } else {
      data[key] = value;
    }
    return data;
  }, {});

  return val;
};
