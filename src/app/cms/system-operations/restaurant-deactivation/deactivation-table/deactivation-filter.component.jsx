import { Api } from "@/constants";
import {
  FormikAutoCompleteAsync,
  FormikSubmitButton,
  changeTableFilter,
} from "@/features/ui";

import { Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

export function DeactivationFilter({ showFilter = false }) {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const handleSubmit = async (values) => {
    if (values?.branchId?.value) {
      dispatchFilter({
        ReferenceId: values?.branchId?.value || "",
        ReferenceTypeId: 4,
      });
    } else if (values?.restaurantId?.value) {
      dispatchFilter({
        ReferenceId: values?.restaurantId?.value || "",
        ReferenceTypeId: 3,
      });
    } else if (values?.zoneId?.value) {
      dispatchFilter({
        ReferenceId: values?.zoneId?.value || "",
        ReferenceTypeId: 2,
      });
    } else {
      dispatchFilter({
        ReferenceId: values?.cityId?.value || "",
        ReferenceTypeId: 1,
      });
    }
  };

  return (
    <div className="my-3">
      <Formik
        initialValues={{
          cityId: "",
          zoneId: "",
          restaurantId: "",
          branchId: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, resetForm }) => {
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <Row>
                  <Col xs={12} sm={6} md={2}>
                    <FormikAutoCompleteAsync
                      name="cityId"
                      autoCompleteAsyncProps={{
                        url: Api.GetPaginatedCityOptions,
                        placeholder: "Search by city",
                        isClearable: true,
                      }}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={2}>
                    <FormikAutoCompleteAsync
                      name="zoneId"
                      autoCompleteAsyncProps={{
                        url: Api.GetPaginatedZoneOptions,
                        placeholder: "Search by zone",
                        isClearable: true,
                        params: {
                          cityId: values?.cityId,
                        },
                      }}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={2}>
                    <FormikAutoCompleteAsync
                      name="restaurantId"
                      autoCompleteAsyncProps={{
                        url: Api.GetPaginatedRestaurantOptions,
                        placeholder: "Search by restaurant",
                        isClearable: true,
                        params: {
                          zoneId: values?.zoneId,
                        },
                      }}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={2}>
                    <FormikAutoCompleteAsync
                      name="branchId"
                      autoCompleteAsyncProps={{
                        url: Api.GetPaginatedBranchOptions,
                        placeholder: "Search by branch",
                        isClearable: true,
                        params: {
                          zoneId: values?.zoneId,
                          restaurantId: values?.restaurantId,
                        },
                      }}
                    />
                  </Col>
                  <Col className="d-flex align-items-end">
                    <FormikSubmitButton
                      variant="outline-primary"
                      className="me-1"
                      type="number"
                    >
                      Filter
                    </FormikSubmitButton>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        resetForm();
                        dispatchFilter({});
                      }}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
