import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateRestaurantTutorialMutation,
  useLazyRestaurantTutorialIDQuery,
  useUpdateRestaurantTutorialMutation,
} from "../restaurant-tutorial-api-slice";
import { InitialValues, RestaurantTutorialSchema } from "./form.config";
import { RestaurantTutorialForm } from "./restaurant-tutorial-form.component";

export const RestaurantTutorialModal = ({ show, onClose, id = null }) => {
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      error: addErrorData,
      isError: addErrorStatus,
    },
  ] = useCreateRestaurantTutorialMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyRestaurantTutorialIDQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateRestaurantTutorialMutation();

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

    formData.append("Title", values.Title);
    formData.append("Description", values.Description);

    formData.append("File", values?.Url ? "" : values.File);
    formData.append("Url", values?.File ? "" : values.Url);
    id ? await editAction({ id, formData }) : await addAction(formData);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && getByIdSuccess
        ? {
            Title: getByIdData?.data?.title,
            Url: getByIdData?.data?.Url,
          }
        : InitialValues,

    validationSchema: id ? "" : RestaurantTutorialSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      getList({
        url: Api.RestaurantTutorialList,
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
        url: Api.RestaurantTutorialList,
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
          {id
            ? "Update restaurant tutorial list"
            : "Create restaurant tutorial list"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {getByIdFetching ? (
          <PageLoader />
        ) : ( */}
        <FormikContext.Provider value={formik}>
          <RestaurantTutorialForm
            close={onClose}
            getByIdData={getByIdData}
            id={id}
            apiErrors={addErrorData || editErrorData}
          />
        </FormikContext.Provider>
        {/* )} */}
      </Modal.Body>
    </Modal>
  );
};
