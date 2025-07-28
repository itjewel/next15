import { Api } from "@/constants";
import {
  CardWrapper,
  FormikAutoComplete,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { FormikAutoCompleteAsync } from "@/features/ui/form/formik-autocomplete-async.component";
import { Form, useFormikContext } from "formik";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const DeactivationForm = ({
  selectType,
  allCitiesOptions,
  allZonesOptions,
  allRestaurantOptions,
  allBrancheOptions,
  branchAvailabilityStatusOptions,
  isBranchDeactivation,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const { id } = useParams();

  return (
    <CardWrapper>
      <Form>
        <Row>
          {isBranchDeactivation && (
            <>
              <Col sm={12} md={6} className="mb-2">
                <FormikInputField
                  name="branchName"
                  inputFieldProps={{
                    label: "Branch Name",
                    value: values.branchName,
                  }}
                  disabled={id}
                />
              </Col>
              <Col sm={12} md={6} className="mb-2">
                <FormikSelectField
                  name="branchAvailabilityStatusId"
                  selectFieldProps={{
                    label: "Branch Availability Status",
                    options:
                      branchAvailabilityStatusOptions?.data?.map((status) => ({
                        label: status.name,
                        value: status.id,
                      })) || [],
                    required: true,
                  }}
                  disabled={id}
                />
              </Col>
              <Col sm={12} md={6} className="mb-2">
                <FormikTextAria
                  name="reason"
                  textAreaProps={{
                    label: "Reason",
                    rows: "1",
                    required: true,
                  }}
                  disabled={id}
                />
              </Col>
              <Col sm={12} md={6} className="mb-2">
                <FormikInputField
                  name="startDate"
                  inputFieldProps={{
                    label: "Start date and time",
                    type: "datetime-local",
                  }}
                  disabled={id}
                />
              </Col>
              <Col sm={12} md={6} className="mb-2">
                <FormikInputField
                  name="endDate"
                  inputFieldProps={{
                    label: "End date and time",
                    type: "datetime-local",
                    required: true,
                  }}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormikTextAria
                  name="description"
                  textAreaProps={{
                    label: "Description",
                    placeholder: "Description",
                  }}
                  disabled={id}
                />
              </Col>
            </>
          )}
          {!isBranchDeactivation && (
            <>
              <Col sm={12} md={6} className="mb-2">
                <FormikTextAria
                  name="reason"
                  textAreaProps={{
                    label: "Reason",
                    rows: "1",
                    required: true,
                  }}
                  disabled={id}
                />
              </Col>
              <Col sm={12} md={6} className="mb-2">
                <FormikSelectField
                  name="type"
                  selectFieldProps={{
                    label: "Choose type",
                    options: selectType || [],
                    required: true,
                  }}
                  disabled={id}
                />
              </Col>
              {(Number(values?.type) === 4 ||
                Number(values?.type) === 2 ||
                Number(values?.type) === 1) && (
                <Col sm={12} md={6} className="mb-2">
                  <FormikAutoCompleteAsync
                    name="city"
                    autoCompleteAsyncProps={{
                      url: Api.GetPaginatedCityOptions,
                      label: "City",
                      required: true,
                      placeholder: "Select a city",
                      isMulti: true,
                    }}
                    disabled={id}
                  />
                </Col>
              )}
              {(Number(values?.type) === 4 || Number(values?.type) === 2) && (
                <Col sm={12} md={6} className="mb-2">
                  <FormikAutoComplete
                    name="zone"
                    autoCompleteProps={{
                      label: "Zone",
                      required: true,
                      options: allZonesOptions?.data || [],
                      placeholder: "Select a zone",
                      isMulti: true,
                    }}
                    disabled={id}
                  />
                </Col>
              )}
              {(Number(values?.type) === 4 || Number(values?.type) === 3) && (
                <Col sm={12} md={6} className="mb-2">
                  <FormikAutoCompleteAsync
                    name="restaurant"
                    autoCompleteAsyncProps={{
                      url: Api.GetPaginatedRestaurantOptions,
                      label: "Restaurant",
                      required: true,
                      placeholder: "Select a restaurant",
                      isMulti: true,
                      onChange: (e) => {
                        setFieldValue("restaurant", e),
                          setFieldValue("branch", []);
                      },
                    }}
                    disabled={id}
                  />
                </Col>
              )}
              {Number(values?.type) === 4 && (
                <Col sm={12} md={6} className="mb-2">
                  <FormikAutoComplete
                    name="branch"
                    autoCompleteProps={{
                      label: "Branch",
                      required: true,
                      options: allBrancheOptions?.data || [],
                      placeholder: "Select a branch",
                      isMulti: true,
                    }}
                    disabled={id}
                  />
                </Col>
              )}
              <Col sm={12} md={6} className="mb-2">
                <FormikInputField
                  name="startDate"
                  inputFieldProps={{
                    required: true,
                    label: "Start date and time",
                    type: "datetime-local",
                  }}
                  disabled={id}
                />
              </Col>
              <Col sm={12} md={6} className="mb-2">
                <FormikInputField
                  name="endDate"
                  inputFieldProps={{
                    required: true,
                    label: "End date and time",
                    type: "datetime-local",
                  }}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormikTextAria
                  name="description"
                  textAreaProps={{
                    label: "Description",
                    placeholder: "Description",
                  }}
                  disabled={id}
                />
              </Col>
            </>
          )}
        </Row>
        <div className="d-flex justify-content-end">
          <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
        </div>
      </Form>
    </CardWrapper>
  );
};
