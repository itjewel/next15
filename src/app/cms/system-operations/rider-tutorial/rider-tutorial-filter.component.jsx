import { Form, Formik } from "formik";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  title: yup.string().trim().optional(),
});

export const RiderTutorialFilter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const debounced = _.debounce((values) => {
    dispatchFilter(values);
  }, 1000);

  return (
    <div className="my-1" style={{ paddingBottom: 10 }}>
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
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
                      name="title"
                      inputFieldProps={{
                        placeholder: "Search by title",
                        onChange: (e) => {
                          setFieldValue("title", e.target.value);
                          // debounced({ title: e.target.value });
                        },
                      }}
                    />
                  </div>

                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end">
                    <FormikSubmitButton
                      variant="outline-primary"
                      className="me-1"
                      type="number"
                    >
                      Filter
                    </FormikSubmitButton>

                    <Button
                      className="ms-2"
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
