import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useDeleteSystemOptionMutation } from "./system-on-off-option-api";
import { ConfirmationModal } from "@/features/ui/common-active-inactive-modal.component";

export const ActiveInactiveModal = ({
  show,
  onClose,
  selectedRow,
  row,
  dataName,
}) => {
  const [deleteSystemOption, { data, isSuccess, isLoading }] =
    useDeleteSystemOptionMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable,
  );

  const onDelete = () => {
    deleteSystemOption(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: "/system-operations/api/SystemOnOffOption",
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
      row={row}
      dataName={dataName}
      module="system on & off option"
      show={show}
      centered
      onClose={onClose}
      onDelete={onDelete}
      isLoading={isLoading}
    />
  );
};
