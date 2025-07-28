import { Button, Modal } from "react-bootstrap";
import { useDeleteFaqMutation } from "./faq-api";
import { useSelector } from "react-redux";
import { useLazyGetTableListQuery } from "@/features/ui";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { ConfirmationModal } from "@/features/ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow, row }) => {
  const [
    deleteItem,
    { data: deleteData, isSuccess, error, isLoading: deleteLoading },
  ] = useDeleteFaqMutation();
  const {
    pageNumber,
    itemsPerPage,
    isActive,
    sortBy,
    sortOrder,
    isLoading,
    filter,
  } = useSelector((state) => state.commonTable);
  const [getList] = useLazyGetTableListQuery();

  const onDelete = async () => {
    await deleteItem(selectedRow);
  };

  useEffect(() => {
    if (deleteData && isSuccess) {
      toast.success(deleteData?.message);
      getList({
        url: Api.GetFaqLists,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
          isLoading,
          ...filter,
        },
      }),
        onClose();
    }
  }, [deleteData]);

  // useEffect(() => {
  //   if (error) {
  //     toast.warning(error?.data?.message);
  //     onClose();
  //   }
  // }, [error]);

  return (
    <ConfirmationModal
      module="FAQ"
      dataName={row?.question}
      show={show}
      isLoading={deleteLoading}
      onClose={onClose}
      onDelete={onDelete}
      centered
    />
  );
};
