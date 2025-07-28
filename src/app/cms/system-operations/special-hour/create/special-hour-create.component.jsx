import { Api } from "@/constants";
import { useGetAllSPecialHourTypeQuery } from "@/features/api";
import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikAutoCompleteAsync,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateSpecialHourMutation,
  useEditSpecialHourMutation,
  useLazyGetSpecialHourByIdQuery,
} from "../special-hour-api";
import { SpecialHourCreateSchema, initialValue } from "./form.config";

export const SpecialHourCreate = ({ show, selectedRow, onClose }) => {
  const { data: specialHourType } = useGetAllSPecialHourTypeQuery();
  const [createTrigger, { data: postResponse, error: postError }] =
    useCreateSpecialHourMutation();
  const [updateTrigger, { data: putResponse, error: putError }] =
    useEditSpecialHourMutation();
  const [trigger, { data: specialHourData, isFetching }] =
    useLazyGetSpecialHourByIdQuery();
  console.log({ specialHourData });
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );
  const [getList] = useLazyGetTableListQuery();

  // console.log({ specialHourType, getList });
  useEffect(() => {
    if (selectedRow?.id) {
      trigger(selectedRow?.id);
    }
  }, [selectedRow?.id]);

  const handleSubmission = async (values) => {
    const payload = {
      specialHourTypeId: values?.specialHourTypeId?.value,
      startTime: values?.startTime,
      endTime: values?.endTime,
    };
    selectedRow?.id
      ? await updateTrigger({ ...payload, id: selectedRow?.id })
      : await createTrigger(payload);
  };

  useEffect(() => {
    if (postResponse || putResponse) {
      toast.success(
        postResponse ? postResponse?.message : putResponse?.message
      );
      getList({
        url: Api.GetSpecialHourList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      onClose();
    }
  }, [postResponse, putResponse]);

  useEffect(() => {
    if (postError || putError) {
      toast.error(postError ? postError?.message : putError?.message);
    }
  }, [postError, putError]);

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          {selectedRow?.id ? "Update" : "Create"} special hour
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isFetching && (
          <Formik
            initialValues={
              selectedRow?.id
                ? {
                    specialHourTypeId: {
                      value: specialHourData?.data?.specialHourTypeId,
                      label: "",
                    },
                    startTime: specialHourData?.data?.startTime,
                    endTime: specialHourData?.data?.endTime,
                  }
                : initialValue
            }
            validationSchema={SpecialHourCreateSchema}
            onSubmit={async (values) => {
              handleSubmission(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Row className="vstack gap-2">
                  <Col>
                    <FormikAutoCompleteAsync
                      name="specialHourTypeId"
                      apiError={
                        postError?.data?.data?.specialHourTypeId ||
                        putError?.data?.data?.specialHourTypeId
                      }
                      autoCompleteAsyncProps={{
                        label: "Special hour type",
                        required: true,
                        placeholder: "Special hour type",
                        url: Api.GetListOfSpecialHourType,
                        isClearable: true,
                        // onChange(value) {
                        //   console.log("Selected value:", value?.value); // Log to inspect the value
                        //   setFieldValue("specialHourTypeId", value?.value); // Adjust based on logged output
                        // },
                      }}
                    />
                    {/* <FormikSelectField
                      name="specialHourTypeId"
                      apiError={
                        postError?.data?.data?.specialHourTypeId ||
                        putError?.data?.data?.specialHourTypeId
                      }
                      selectFieldProps={{
                        label: "Special hour type",
                        options: specialHourType?.items || [],
                        required: true,
                      }}
                    /> */}
                  </Col>
                  <Col>
                    <FormikInputField
                      name="startTime"
                      apiError={
                        postError?.data?.data?.startTime ||
                        putError?.data?.data?.startTime
                      }
                      inputFieldProps={{
                        label: "Start time",
                        type: "time",
                        required: true,
                      }}
                    />
                  </Col>
                  <Col>
                    <FormikInputField
                      name="endTime"
                      apiError={
                        postError?.data?.data?.endTime ||
                        putError?.data?.data?.endTime
                      }
                      inputFieldProps={{
                        label: "End time",
                        type: "time",
                        required: true,
                      }}
                    />
                  </Col>
                </Row>
                <div className="justify-content-end d-flex gap-2 mt-3">
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                  <Button variant="outline-secondary" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};
