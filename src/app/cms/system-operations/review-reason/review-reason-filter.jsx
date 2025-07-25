import {
  FormikInputField,
  FormikSubmitButton,
  changeTableFilter,
} from "@/features/ui";
import { Form, Formik } from "formik";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  Name: Yup.string(),
});
export const ReviewReasonFilter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const debounced = _.debounce((values) => {
    dispatchFilter(values);
  }, 1000);
  return (
    <div className="my-1" style={{ paddingBottom: "10px" }}>
      <Formik
        initialValues={{ Name: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          dispatchFilter(values);
        }}
      >
        {({ values, resetForm, setFieldValue }) => {
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikInputField
                      name="Name"
                      inputFieldProps={{
                        placeholder: "Search by name",
                        onChange: (e) => {
                          setFieldValue("Name", e.target.value);
                          // debounced({ Name: e.target.value });
                        },
                      }}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3  d-flex align-items-end">
                    <FormikSubmitButton
                      style={{ minWidth: "5.5rem" }}
                      variant="outline-primary"
                      className="me-1"
                    >
                      Filter
                    </FormikSubmitButton>
                    <Button
                      variant="outline-secondary"
                      style={{ minWidth: "5.5 rem" }}
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
