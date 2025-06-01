import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { FormikInputField, FormikSubmitButton } from "../ui";
import { changeTableFilter } from "../ui/table/common-table-slice";
import _ from "lodash";

const ValidationSchema = yup.object({
  name: yup.string().trim().optional(),
});

export const Filter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));
  const { filter } = useSelector((state) => state.commonTable);

  const debounced = _.debounce((values) => {
    dispatchFilter(values);
  }, 1000);
  return (
    <div className="my-1" style={{ paddingBottom: 10 }}>
      <Formik
        enableReinitialize
        initialValues={{
          name: filter?.name || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ resetForm, setFieldValue }) => {
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikInputField
                      name="name"
                      inputFieldProps={{
                        placeholder: "Search by campaign name",
                        onChange: (e) => {
                          setFieldValue("name", e.target.value);
                          debounced({ name: e.target.value });
                        },
                      }}
                    />
                  </div>

                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end">
                    <FormikSubmitButton
                      variant="outline-primary"
                      className="me-1"
                      type="number"
                      style={{
                        minimuWidth: "5.5rem",
                      }}
                    >
                      Filter
                    </FormikSubmitButton>
                    <Button
                      className="ms-2"
                      variant="outline-secondary"
                      style={{
                        minimuWidth: "5.5rem",
                      }}
                      onClick={() => {
                        resetForm({
                          values: {
                            name: "",
                          },
                        });
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
