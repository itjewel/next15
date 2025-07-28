import { Api } from "@/constants";
import { PageLoader } from "@/features/ui/page-loader.component";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateSpecialHourTypeMutation,
  useLazyGetSpecialHourTypeIdQuery,
  useUpdateSpecialHourTypeMutation,
} from "../special-hour-type-api";
import { SpecialHourTypeform } from "./special-hour-type-form.component";
import { specialHourTypeSchema, InitialValues } from "./form.config";
import { trim } from "lodash";

export const CreateEditModal = ({ show, onClose, id = null }) => {
  const [
    createData,
    {
      data: listData,
      isSuccess: successList,
      error: errorData,
      isError: errorStatus,
    },
  ] = useCreateSpecialHourTypeMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetSpecialHourTypeIdQuery();

  const [
    updateData,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateSpecialHourTypeMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (listData && successList) {
      toast.success(listData?.message);
      onClose();
      formik.resetForm();
      getList({
        url: Api.GetListOfSpecialHourType,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
    }
    if (errorData && errorStatus) {
      toast.error(errorData?.data?.message);
      formik.setSubmitting(false);
    }
  }, [listData, successList, errorData, errorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      onClose();

      getList({
        url: Api.GetListOfSpecialHourType,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      formik.resetForm();
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
      formik.setSubmitting(false);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && getByIdSuccess
        ? {
            id,
            name: getByIdData?.data?.name,
            description: getByIdData?.data?.description,
          }
        : InitialValues,
    validationSchema: specialHourTypeSchema,
    onSubmit: async (values) => {
      id
        ? await updateData({
            id,
            name: trim(values?.name),
            description: trim(values?.description),
          })
        : await createData({
            name: trim(values?.name),
            description: trim(values?.description),
          });
    },
  });

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>
          {id ? "Update special hour type" : "Create special hour type"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <SpecialHourTypeform
              close={onClose}
              apiErrors={errorData || editErrorData}
            />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
