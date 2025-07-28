import { ConfirmationModal, useLazyGetTableListQuery } from "@/features/ui";
import { useDeleteReviewReasonMutation } from "./review-reason-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const EnableDisableModal = ({ show, onClose, selectedRow, row }) => {
  const [
    deleteReviewReason,
    {
      data: deleteResponse,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      error,
    },
  ] = useDeleteReviewReasonMutation();
  const [getList] = useLazyGetTableListQuery();
  const {
    pageNumber,
    itemsPerPage,
    isActive,
    sortBy,
    sortOrder,
    isLoading,
    filter,
  } = useSelector((state) => state.commonTable);
  function onDelete() {
    deleteReviewReason(selectedRow);
  }

  useEffect(() => {
    if (deleteResponse) {
      toast.success(deleteResponse?.message);
      getList({
        url: "/system-operations/api/ReviewReason",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
          isLoading,
          ...filter,
        },
      });
      onClose();
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      onClose();
    }
  }, [error]);
  return (
    <ConfirmationModal
      row={row}
      show={show}
      dataName={row?.name}
      module={"review reason"}
      centered
      onClose={onClose}
      onDelete={onDelete}
      isLoading={deleteLoading}
    />
  );
};
