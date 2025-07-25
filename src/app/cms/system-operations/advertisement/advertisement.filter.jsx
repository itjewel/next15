import { Form, Formik } from "formik";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  Title: yup.string().min(1).max(100).trim(),
});

export const AdvertisementFilter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const debounced = _.debounce((values) => {
    dispatchFilter(values);
  }, 1000);

  return (
    <div
      className="my-1"
      style={{
        paddingBottom: 10,
      }}
    >
      <Formik
        initialValues={{
          Title: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm, setFieldValue }) => {
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikInputField
                      name="Title"
                      inputFieldProps={{
                        placeholder: "Search by title",
                        onChange: (e) => {
                          setFieldValue("Title", e.target.value);
                          // debounced({ Title: e.target.value });
                        },
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
