import {
  FormikInputField,
  FormikSubmitButton,
  changeTableFilter,
} from "@/features/ui";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import moment from "moment";

const validation = Yup.object({
  startTime: Yup.string().trim().min(1),
  endTime: Yup.string().trim().min(1),
});

export const Filter = ({ showFilter = false }) => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  const [params, setParams] = useState({});

  useEffect(() => {
    let getData;
    if (params.startTime != "" || params.endTime != "") {
      getData = setTimeout(() => {
        dispatchFilter(params);
      }, 1000);
    }
    if (getData) return () => clearTimeout(getData);
  }, [params]);

  return (
    <div className="my-1" style={{ paddingBottom: "10px" }}>
      <Formik
        initialValues={{
          startTime: "",
          endTime: "",
        }}
        validationSchema={validation}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm, setFieldValue }) => {
          setParams(values);
          return (
            <Form>
              <div style={{ display: `${showFilter ? "block" : "none"}` }}>
                <div className="row row-gap-3">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-2">
                    <FormikInputField
                      name="startTime"
                      inputFieldProps={{
                        label: "Start time",
                        placeholder: "Enter Start Time",
                        type: "time",
                        step: "2",
                      }}
                      value={values.startTime}
                      onChange={() => {
                        setFieldValue(
                          "startTime",
                          moment(values?.startTime, "hh:mm:ss a").format(
                            "HH:mm:ss"
                          )
                        ),
                          console.log(values?.startTime);
                      }}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-2">
                    <FormikInputField
                      name="endTime"
                      inputFieldProps={{
                        label: "End Time",
                        placeholder: "Enter End Time",
                        type: "time",
                        step: "2",
                      }}
                      value={values.endTime}
                      onChange={() => {
                        setFieldValue(
                          "endTime",
                          moment(values?.endTime, "hh:mm:ss a").format(
                            "HH:mm:ss"
                          )
                        ),
                          console.log(values.endTime);
                      }}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-2 d-flex align-items-end">
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
