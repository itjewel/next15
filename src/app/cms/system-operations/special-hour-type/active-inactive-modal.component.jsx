import { Api } from "@/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useDeleteSpecialHourTypeMutation } from "./special-hour-type-api";
import { ConfirmationModal } from "@/features/ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow, row }) => {
  const [removeSpecialHour, { data, isSuccess, isLoading: deleteLoading }] =
    useDeleteSpecialHourTypeMutation();

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

  const onDelete = async () => {
    await removeSpecialHour(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.GetListOfSpecialHourType,
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
  }, [data]);

  return (
    <ConfirmationModal
      module="special hour type"
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
