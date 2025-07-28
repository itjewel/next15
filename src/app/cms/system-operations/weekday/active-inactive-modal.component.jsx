import { Api } from "@/constants";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useDeleteWeekdayByIdMutation } from "./weekday-api";
import { ConfirmationModal } from "@/features/ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [removeWeekday, { data, isSuccess, isLoading }] =
    useDeleteWeekdayByIdMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable,
  );

  const onDelete = async () => {
    await removeWeekday(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
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
      onClose();
    }
  }, [data]);

  return (
    <ConfirmationModal
      module="Weekday"
      row={row}
      dataName={row?.name}
      show={show}
      isLoading={isLoading}
      onClose={onClose}
      onDelete={onDelete}
      centered
    />
  );
};
