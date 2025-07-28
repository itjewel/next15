import { Api } from "@/constants";
import { ConfirmationModal, useLazyGetTableListQuery } from "@/features/ui";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteRestaurantTutorialMutation } from "./restaurant-tutorial-api-slice";

export const ActiveInactiveModal = ({ row, show, onClose, selectedRow }) => {
  const [deleteMenu, { data, isSuccess, isLoading }] =
    useDeleteRestaurantTutorialMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder, filter } =
    useSelector((state) => state.commonTable);

  const onDelete = async () => {
    await deleteMenu(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.RestaurantTutorialList,
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
      row={row}
      dataName={row?.title}
      module="restaurant tutorial"
      show={show}
      isLoading={isLoading}
      onClose={onClose}
      onDelete={onDelete}
      centered
    />
  );
};
