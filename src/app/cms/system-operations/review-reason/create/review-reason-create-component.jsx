import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddReviewReasonMutation,
  useLazyGetReviewReasonByIdQuery,
  useUpdateReviewReasonMutation,
} from "../review-reason-api";
import { ReviewreasonSchema, initialValue } from "./form.config";

export const ReviewReasonCreate = ({ show, onClose, selectedRow }) => {
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );
  const [
    addReviewReason,
    { data: postResponse, isSuccess: postSuccess, error: postError },
  ] = useAddReviewReasonMutation();
  const [
    updateReviewReason,
    { data: putResponse, isSuccess: putSuccess, error: putError },
  ] = useUpdateReviewReasonMutation();
  const [trigger, { data: reviewReasonData, isFetching }] =
    useLazyGetReviewReasonByIdQuery();

  useEffect(() => {
    if (selectedRow?.id) {
      trigger(selectedRow.id);
    }
  }, [selectedRow?.id]);

  useEffect(() => {
    if (postResponse && postSuccess) {
      toast.success(postResponse?.message);
      getList({
        url: "/system-operations/api/ReviewReason",
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

    if (putResponse && putSuccess) {
      toast.success(putResponse?.message);
      getList({
        url: "/system-operations/api/ReviewReason",
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
    if (postError) {
      toast.error(postError?.data?.message);
    }
    if (putError) {
      toast.error(putError?.data?.message);
    }
  }, [postError, putError]);

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          {selectedRow?.id ? "Update" : "Create"} review reason
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isFetching && (
          <Formik
            enableReinitialize
            initialValues={
              selectedRow?.id
                ? {
                    id: selectedRow?.id,
                    name: reviewReasonData?.data?.name,
                    reviewBy: reviewReasonData?.data?.reviewBy,
                    type: reviewReasonData?.data?.type,
                  }
                : initialValue
            }
            validationSchema={ReviewreasonSchema}
            onSubmit={async (values) =>
              selectedRow?.id
                ? await updateReviewReason(values)
                : await addReviewReason(values)
            }
          >
            {({ values }) => (
              <Form>
                <Stack direction="vertical" gap={2}>
                  <FormikInputField
                    name="name"
                    apiError={
                      postError?.data?.data?.name || putError?.data?.data?.name
                    }
                    inputFieldProps={{
                      label: "Name",
                      type: "text",
                      required: true,
                      placeholder: "Enter name",
                    }}
                  />
                  <FormikSelectField
                    name="reviewBy"
                    apiError={
                      postError?.data?.data?.reviewBy ||
                      putError?.data?.data?.reviewBy
                    }
                    selectFieldProps={{
                      label: "Review by",
                      required: true,
                      options: [
                        { label: "Rider", value: 1 },
                        {
                          label: "Customer",
                          value: 4,
                        },
                        {
                          label: "CMS",
                          value: 3,
                        },
                        {
                          label: "Restaurant",
                          value: 2,
                        },
                      ],
                    }}
                  />
                  <FormikSelectField
                    name="type"
                    apiError={
                      postError?.data?.data?.type || putError?.data?.data?.type
                    }
                    selectFieldProps={{
                      label: "Type",
                      required: true,
                      options: [
                        {
                          label: "Good",
                          value: 1,
                        },
                        {
                          label: "Bad",
                          value: 2,
                        },
                      ],
                    }}
                  />
                </Stack>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button variant="outline-secondary" onClick={onClose}>
                    Close
                  </Button>
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};
