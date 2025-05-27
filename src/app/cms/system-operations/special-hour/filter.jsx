import { useGetAllSPecialHourTypeQuery } from "@/features/api";
import { Api } from "@/constants";
import {
  // FormikAutoComplete,
  FormikSelectField,
  FormikSubmitButton,
  changeTableFilter,
  FormikAutoCompleteAsync,
} from "@/features/ui";
import { Form, Formik } from "formik";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
export const SpecialHourFilter = ({ showFilter = false }) => {
  const { data: specialHourType } = useGetAllSPecialHourTypeQuery();

  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const debounced = _.debounce((values) => {
    dispatchFilter(values);
  }, 1000);

  return (
    <div className="my-1" style={{ paddingBottom: "10px" }}>
      <Formik
        initialValues={{ SpecialHourType: "", IsActive: "" }}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ resetForm, setFieldValue }) => {
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap=3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikAutoCompleteAsync
                      name="SpecialHourType"
                      autoCompleteAsyncProps={{
                        placeholder: "Search by special hour type",
                        url: Api.GetListOfSpecialHourType,
                      }}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikSelectField
                      name="IsActive"
                      selectFieldProps={{
                        placeholder: "Search by active status",
                        options: [
                          {
                            label: "Yes",
                            value: true,
                          },
                          {
                            label: "No",
                            value: false,
                          },
                        ],
                        onChange: (e) => {
                          setFieldValue("IsActive", e.target.value);
                          debounced({ IsActive: e.target.value });
                        },
                      }}
                    />
                  </div>
                  <div className="d-flex col-12 col-sm-6 col-md-4 col-lg-3">
                    <FormikSubmitButton
                      variant="outline-primary"
                      className="me-1"
                    >
                      Filter
                    </FormikSubmitButton>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        resetForm(), dispatchFilter({});
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
