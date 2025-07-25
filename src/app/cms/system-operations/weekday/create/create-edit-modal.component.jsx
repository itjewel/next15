import { Api } from "@/constants";
import { PageLoader } from "@/features/ui/page-loader.component";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateWeekdayMutation,
  useLazyGetWeekdaysIdQuery,
  useUpdateWeekdayByIdMutation,
} from "../weekday-api";
import { Weekdayform } from "./weekday-create-form.component";
import { WeekdaySchema, InitialValues } from "./form.config";
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
  ] = useCreateWeekdayMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetWeekdaysIdQuery();

  const [
    updateData,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateWeekdayByIdMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable,
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
        url: Api.GetListOfWeekDay,
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
      formik.resetForm();
      getList({
        url: Api.GetListOfWeekDay,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
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
          }
        : InitialValues,
    validationSchema: WeekdaySchema,

    onSubmit: (values) => {
      id
        ? updateData({ name: trim(values.name), id: id })
        : createData({ name: trim(values.name) });
    },
  });

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>{id ? "Edit WeekDay" : "Create Weekday"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <Weekdayform close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
