import { Api } from "@/constants";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useRemoveAdvertisementIdMutation } from "./advertisement-apislice";
import { ConfirmationModal } from "@/features/ui";

export const ActiveInactiveModal = ({
  show,
  onClose,
  selectedRow,
  row,
  dataName,
}) => {
  const [deleteSpecialHour, { data, isSuccess, isLoading }] =
    useRemoveAdvertisementIdMutation();
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
        url: Api.GetListOfAdvertisement,
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
      module="advertise"
      show={show}
      isLoading={isLoading}
      onClose={onClose}
      onDelete={onDelete}
      dataName={dataName}
      row={row}
      centered
    />
  );
};
