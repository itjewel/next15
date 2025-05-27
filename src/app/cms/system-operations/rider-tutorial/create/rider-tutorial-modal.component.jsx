import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { PageLoader } from "@/features/ui/page-loader.component";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateRiderTutorialMutation,
  useLazyRiderTutorialIDQuery,
  useUpdateRiderTutorialMutation,
} from "../rider-tutorial-api-slice";
import { InitialValues, RiderTutorialSchema } from "./form.config";
import { RiderTutorialForm } from "./rider-tutorial-form.component";

export const RiderTutorialModal = ({ show, onClose, id = null }) => {
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      error: addErrorData,
      isError: addErrorStatus,
    },
  ] = useCreateRiderTutorialMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyRiderTutorialIDQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateRiderTutorialMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  const handleSubmit = async (values) => {
    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("videoURL", values.videoURL);
    id ? await editAction({ id, formData }) : await addAction(formData);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && getByIdSuccess
        ? {
            title: getByIdData?.data?.title,
            videoURL: getByIdData?.data?.videoURL,
          }
        : InitialValues,

    validationSchema: id ? "" : RiderTutorialSchema,

    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      getList({
        url: Api.RiderTutorialList,
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
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      getList({
        url: Api.RiderTutorialList,
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
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>
          {id ? "Update rider tutorial list" : "Create rider tutorial list"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <RiderTutorialForm
              close={onClose}
              id={id}
              apiErrors={addErrorData || editErrorData}
            />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
