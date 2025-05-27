import { Api } from "@/constants";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useDeleteReasonOfSystemOnOffMutation } from "./system-on-off-api";
import { ConfirmationModal } from "@/features/ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow, row }) => {
  const [deleteSpecialHour, { data, isSuccess, isLoading: deleteLoading }] =
    useDeleteReasonOfSystemOnOffMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder, filter } =
    useSelector((state) => state.commonTable);

  const onDelete = async () => {
    await deleteSpecialHour(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.GetReasonListOfSystemOnOff,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
          ...filter,
        },
      });
      onClose();
    }
  }, [data]);

  return (
    <ConfirmationModal
      module="System on off reason"
      row={row}
      dataName={row?.name}
      show={show}
      isLoading={deleteLoading}
      onClose={onClose}
      onDelete={onDelete}
      centered
    />
  );
};
