import { Api } from "@/constants";
import {
  useLazyGetBranchByRestroAndZoneIdsQuery,
  useLazyGetZoneByCityIdsQuery,
} from "@/features/promo-code/promo-code-api-slice";
import { FormikAutoComplete } from "@/features/ui";
import { FormikAutoCompleteAsync } from "@/features/ui/form/formik-autocomplete-async.component";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

const filterAndSetFieldValues = (data, values, field, setFieldValue) => {
  const commonObj = _.intersectionBy(data, values[field], "value");
  setFieldValue(field, commonObj);
};

export const PromoTypes = ({
  values,
  setFieldValue,
  allCities,
  restaurants,
  allZonesOptions,
  allBrancheOptions,
}) => {
  const [getZoneByCityIds, { data: zoneOptionName }] =
    useLazyGetZoneByCityIdsQuery();

  const [
    getBranchByRestaurantAndZoneIds,
    { data: branchOptionName, isFetching },
  ] = useLazyGetBranchByRestroAndZoneIdsQuery();

  const referenceTypeId = Number(values?.referenceTypeId);

  const [zoneOptions, setZoneOptions] = useState(allZonesOptions?.items);
  const [branchOptions, setBranchOptions] = useState(allBrancheOptions?.items);

  useEffect(() => {
    if (values?.cityId) {
      const ids = values?.cityId?.map((item) => item?.value);
      getZoneByCityIds(ids);
    }
  }, [values?.cityId]);

  useEffect(() => {
    if (zoneOptionName?.data) {
      setZoneOptions(zoneOptionName?.data);
      filterAndSetFieldValues(
        zoneOptionName?.data,
        values,
        "zoneId",
        setFieldValue
      );
    }
  }, [zoneOptionName?.data]);

  useEffect(() => {
    if (values?.restaurantId && values?.zoneId) {
      const restaurantIds = values?.restaurantId?.map((val) => val.value);
      const zoneIds = values?.zoneId?.map((val) => val.value);
      getBranchByRestaurantAndZoneIds({ restaurantIds, zoneIds });
    }
  }, [values?.restaurantId, values?.zoneId]);

  useEffect(() => {
    if (branchOptionName?.data) {
      setBranchOptions(branchOptionName?.data);
      filterAndSetFieldValues(
        branchOptionName?.data,
        values,
        "branchId",
        setFieldValue
      );
    }
  }, [branchOptionName?.data]);

  const autoCompleteProps = {
    isMulti: true,
    required: referenceTypeId === 2 || referenceTypeId === 4,
  };

  return (
    <>
      {referenceTypeId === 2 && (
        <>
          <Col sm={12} md={4} className="mb-3">
            <FormikAutoCompleteAsync
              name="cityId"
              autoCompleteAsyncProps={{
                label: "City",
                placeholder: "Search by city",
                url: Api.GetPaginatedCityOptions,
                isClearable: true,
                ...autoCompleteProps,
              }}
            />
          </Col>

          <Col sm={12} md={4} className="mb-3">
            <FormikAutoCompleteAsync
              name="zoneId"
              autoCompleteAsyncProps={{
                label: "Zone",
                url: Api.GetPaginatedZoneOptions,
                isClearable: true,
                ...autoCompleteProps,
              }}
            />
          </Col>
        </>
      )}

      {(referenceTypeId === 3 || referenceTypeId === 4) && (
        <>
          {referenceTypeId === 4 && (
            <Col sm={12} md={4} className="mb-3">
              <FormikAutoCompleteAsync
                name="cityId"
                autoCompleteAsyncProps={{
                  label: "City",
                  url: Api.GetPaginatedCityOptions,
                  isClearable: true,
                  placeholder: "Search by city",
                  onChange: (newValue) => {
                    setFieldValue("cityId", newValue);
                    const ids = newValue?.map((val) => val.value);
                    getZoneByCityIds(ids);
                  },
                  ...autoCompleteProps,
                }}
              />
            </Col>
          )}
          {referenceTypeId === 4 && (
            <Col sm={12} md={4} className="mb-3">
              <FormikAutoComplete
                name="zoneId"
                autoCompleteProps={{
                  label: "Zone",
                  options: zoneOptions || [],
                  ...autoCompleteProps,
                }}
              />
            </Col>
          )}
          <Col sm={12} md={4} className="mb-3">
            <FormikAutoCompleteAsync
              name="restaurantId"
              autoCompleteAsyncProps={{
                label: "Restaurant",
                url: Api.GetPaginatedRestaurantOptions,
                ...autoCompleteProps,
              }}
            />
          </Col>

          {referenceTypeId === 4 && (
            <Col sm={12} md={4} className="mb-3">
              <FormikAutoComplete
                name="branchId"
                autoCompleteProps={{
                  label: "Branch",
                  isLoading: isFetching,
                  options: branchOptions || [],
                  ...autoCompleteProps,
                }}
              />
            </Col>
          )}
        </>
      )}
    </>
  );
};
