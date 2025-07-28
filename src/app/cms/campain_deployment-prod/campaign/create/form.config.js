import moment from "moment";
import { useEffect, useState } from "react";
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

export const useInitialValues = (
  singleCampaign,
  allRestaurantOptions,
  allBrancheOptions,
  allCities,
  allZonesOptions
) => {
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const makeInitialValues = () => {
      const filteredRestaurantId = filterByIds(
        allRestaurantOptions?.items,
        singleCampaign?.data?.restaurants
      );
      const filteredBranchId = filterByIds(
        allBrancheOptions?.items,
        singleCampaign?.data?.branchs
      );
      const filteredCityId = filterByIncludes(
        allCities?.items,
        singleCampaign?.data?.cityIds
      );
      const filteredZoneId = filterByIncludes(
        allZonesOptions?.items,
        singleCampaign?.data?.zoneIds
      );

      const formattedStartDate = formatDateTime(
        singleCampaign?.data?.startDate
      );
      const formattedEndDate = formatDateTime(singleCampaign?.data?.endDate);

      const initialVals = {
        ...(singleCampaign?.data || {}),
        restaurantId: filteredRestaurantId,
        fileImage: singleCampaign?.data?.image,
        bannerFileImage: singleCampaign?.data?.bannerImage,
        branchId: filteredBranchId,
        cityId: filteredCityId,
        zoneId: filteredZoneId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        isInTop: singleCampaign?.data?.isInTop,
      };

      return initialVals;
    };

    setInitialValues(makeInitialValues());
  }, [
    singleCampaign,
    allRestaurantOptions,
    allBrancheOptions,
    allCities,
    allZonesOptions,
  ]);

  return initialValues;
};

export const InitialValues = {
  name: "",
  description: "",
  referenceTypeId: "",
  fileImage: "",
  bannerFileImage: "",
  startDate: "",
  endDate: "",
  referenceIds: [],
  cityId: [],
  zoneId: [],
  restaurantId: [],
  branchId: [],
  description: "",
  isInTop: true,
  isDeleteImage: false,
  isPickup: false,
  isDelivery: false,
  isDineIn: false,
  isFlower: false,
};

export const UpdateValidationSchema = yup.object().shape({
  name: yup.string().min(1).trim().required("Name is required"),
  isInTop: yup.boolean(),
  referenceTypeId: yup.string().required("Reference type is required"),

  startDate: yup.date().required("Start date is required"),

  endDate: yup
    .date()
    .required("End date is required")
    .test(
      "isEndDateValid",
      "End date and time must be after the start date",
      function (value) {
        const { startDate } = this.parent;
        return value && new Date(value) > new Date(startDate);
      }
    )
    .test(
      "isEndDateInFuture",
      "End date cannot be in the past or present",
      function (value) {
        return value && new Date(value) > new Date();
      }
    ),

  cityId: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
        .required()
    )
    .when(["referenceTypeId"], ([referenceTypeId], schema) => {
      const refId = Number(referenceTypeId);
      if (refId === 2 || refId === 4) {
        return yup
          .array()
          .of(
            yup.object().shape({
              value: yup.string().required(),
              label: yup.string().required(),
            })
          )
          .required("city is required")
          .min(1, "Minimum one city is required");
      }
      return schema;
    }),
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
        const refId = Number(referenceTypeId);

        if ((refId === 2 && cityId) || (refId === 4 && cityId)) {
          return yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
              })
            )
            .required("Zone is required")
            .min(1, "Minimum one zone is required");
        }
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
    .when(
      ["referenceTypeId", "cityId", "zoneId"],
      ([referenceTypeId, cityId, zoneId], schema) => {
        const refId = Number(referenceTypeId);
        if (refId === 3 || (refId === 4 && cityId && zoneId)) {
          return schema
            .required("Restaurant is required")
            .min(1, "Minimum one restaurant is required");
        }
        return schema;
      }
    ),

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
        const refId = Number(referenceTypeId);
        if (refId === 4 && cityId && zoneId && restaurantId) {
          return yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
              })
            )
            .required("Branch is required")
            .min(1, "Minimum one branch is required");
        }
        return schema;
      }
    ),
  fileImage: yup
    .mixed()
    .test("fileTypeAndSize", "Invalid file type or size", function (value) {
      if (typeof value != "string") {
        const allowedImageExtensions = [
          ".jpg",
          ".jpeg",
          ".bmp",
          ".png",
          ".webp",
          ".gif",
        ];

        return (
          value.type.startsWith("image/") &&
          allowedImageExtensions.includes(
            `.${value.name.split(".").pop().toLowerCase()}`
          ) &&
          value.size <= 3 * 1024 * 1024
        );
      }

      return true;
    })
    .required("Image is required"),
  bannerFileImage: yup
    .mixed()
    .test("fileTypeAndSize", "Invalid file type or size", function (value) {
      if (typeof value != "string") {
        const allowedImageExtensions = [
          ".jpg",
          ".jpeg",
          ".bmp",
          ".png",
          ".webp",
          ".gif",
        ];

        return (
          value.type.startsWith("image/") &&
          allowedImageExtensions.includes(
            `.${value.name.split(".").pop().toLowerCase()}`
          ) &&
          value.size <= 3 * 1024 * 1024
        );
      }

      return true;
    })
    .required("Image is required"),

  description: yup
    .string()
    .required("Description is a required field")
    .trim()
    .min(1, "Minmimum one charecter required"),
});

export const ValidationSchema = yup.object().shape({
  name: yup.string().min(1).trim().required("Name is required"),
  isInTop: yup.boolean(),
  referenceTypeId: yup.string().required("Reference type is required"),

  startDate: yup
    .date()
    .required("Start date is required")
    .test(
      "isStartDateValid",
      "Start date and time cannot be in the past or present",
      function (value) {
        return value && new Date(value) > new Date();
      }
    ),

  endDate: yup
    .date()
    .required("End date is required")
    .test(
      "isEndDateValid",
      "End date and time must be after the start date",
      function (value) {
        const { startDate } = this.parent;
        return value && new Date(value) > new Date(startDate);
      }
    )
    .test(
      "isEndDateInFuture",
      "End date cannot be in the past or present",
      function (value) {
        return value && new Date(value) > new Date();
      }
    ),

  cityId: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
        .required()
    )
    .when(["referenceTypeId"], ([referenceTypeId], schema) => {
      const refId = Number(referenceTypeId);
      if (refId === 2 || refId === 4) {
        return yup
          .array()
          .of(
            yup.object().shape({
              value: yup.string().required(),
              label: yup.string().required(),
            })
          )
          .required("city is required")
          .min(1, "Minimum one city is required");
      }
      return schema;
    }),
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
        const refId = Number(referenceTypeId);

        if ((refId === 2 && cityId) || (refId === 4 && cityId)) {
          return yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
              })
            )
            .required("Zone is required")
            .min(1, "Minimum one zone is required");
        }
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
    .when(
      ["referenceTypeId", "cityId", "zoneId"],
      ([referenceTypeId, cityId, zoneId], schema) => {
        const refId = Number(referenceTypeId);
        if (refId === 3 || (refId === 4 && cityId && zoneId)) {
          return schema
            .required("Restaurant is required")
            .min(1, "Minimum one restaurant is required");
        }
        return schema;
      }
    ),

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
        const refId = Number(referenceTypeId);
        if (refId === 4 && cityId && zoneId && restaurantId) {
          return yup
            .array()
            .of(
              yup.object().shape({
                value: yup.string().required(),
                label: yup.string().required(),
              })
            )
            .required("Branch is required")
            .min(1, "Minimum one branch is required");
        }
        return schema;
      }
    ),
  fileImage: yup
    .mixed()
    .test("fileTypeAndSize", "Invalid file type or size", function (value) {
      if (typeof value != "string") {
        const allowedImageExtensions = [
          ".jpg",
          ".jpeg",
          ".bmp",
          ".png",
          ".webp",
          ".gif",
        ];

        return (
          value.type.startsWith("image/") &&
          allowedImageExtensions.includes(
            `.${value.name.split(".").pop().toLowerCase()}`
          ) &&
          value.size <= 3 * 1024 * 1024
        );
      }

      return true;
    })
    .required("Image is required"),
  bannerFileImage: yup
    .mixed()
    .test("fileTypeAndSize", "Invalid file type or size", function (value) {
      if (typeof value != "string") {
        const allowedImageExtensions = [
          ".jpg",
          ".jpeg",
          ".bmp",
          ".png",
          ".webp",
          ".gif",
        ];

        return (
          value.type.startsWith("image/") &&
          allowedImageExtensions.includes(
            `.${value.name.split(".").pop().toLowerCase()}`
          ) &&
          value.size <= 3 * 1024 * 1024
        );
      }

      return true;
    })
    .required("Image is required"),

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
    } else if (key === "bannerFileImage") {
      data.BannerFileImage = value;
    } else if (key === "startDate" || key === "endDate") {
      data[key] = moment(value).toISOString();
    } else {
      data[key] = value;
    }
    return data;
  }, {});

  return val;
};
