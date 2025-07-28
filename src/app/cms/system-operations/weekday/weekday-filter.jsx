import { Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  name: yup.string().min(1).max(100).trim(),
});

export const WeekdayFilter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const [params, setParams] = useState({});

  return (
    <div
      className="my-1"
      style={{
        paddingBottom: 10,
      }}
    >
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          setParams(values);

          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikInputField
                      name="name"
                      inputFieldProps={{
                        placeholder: "Search by week name",
                      }}
                    />
                  </div>

                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-1">
                    <FormikSubmitButton
                      style={{
                        minwidth: "5.5rem",
                      }}
                      variant="outline-primary"
                      className="me-1"
                    >
                      Filter
                    </FormikSubmitButton>
                    <Button
                      style={{
                        minwidth: "5.5rem",
                      }}
                      variant="outline-secondary"
                      onClick={() => {
                        resetForm();
                        dispatchFilter({});
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
