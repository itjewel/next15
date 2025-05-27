import {
  FormikInputField,
  FormikSubmitButton,
  changeTableFilter,
} from "@/features/ui";
import { Form, Formik } from "formik";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const validation = yup.object({
  Question: yup.string().trim().min(1, "Minimum one question is required"),
});

export const Filter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const debounced = _.debounce((values) => {
    dispatchFilter(values);
  }, 1000);

  return (
    <div className="my-1" style={{ paddingBottom: "10px" }}>
      <Formik
        initialValues={{ Question: "" }}
        validationSchema={validation}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm, setFieldValue }) => {
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikInputField
                      name="Question"
                      inputFieldProps={{
                        placeholder: "Search by question",
                        onChange: (e) => {
                          setFieldValue("Question", e.target.value);
                          // debounced({ Question: e.target.value });
                        },
                      }}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end">
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
