import { Api } from "@/constants";
import { ConfirmationModal, useLazyGetTableListQuery } from "@/features/ui";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteTimeSlotMutation } from "./time-slot-api";

export const ActiveInactiveModal = ({ show, selectedRow, onClose, row }) => {
  const [
    deleteItem,
    { data: deleteData, isSuccess, error, isLoading: deleteLoading },
  ] = useDeleteTimeSlotMutation();
  const {
    pageNumber,
    itemsPerPage,
    isActive,
    isLoading,
    sortBy,
    sortOrder,
    filter,
  } = useSelector((state) => state?.commonTable);
  const [getList] = useLazyGetTableListQuery();

  function handleDelete() {
    deleteItem(selectedRow);
  }

  useEffect(() => {
    if (deleteData && isSuccess) {
      toast.success(deleteData?.message);
      getList({
        url: Api.GetPlatformTimeSlot,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          isLoading,
          sortBy,
          sortOrder,
          ...filter,
        },
      }),
        onClose();
    }
  }, [deleteData]);

  useEffect(() => {
    if (error) {
      toast.warning(error?.data?.message);
      onClose();
    }
  }, [error]);

  return (
    <ConfirmationModal
      module="System operation time slot"
      row={row}
      dataName={row?.weekDayName}
      show={show}
      isLoading={deleteLoading}
      onClose={onClose}
      onDelete={handleDelete}
      centered
    />
  );
};
