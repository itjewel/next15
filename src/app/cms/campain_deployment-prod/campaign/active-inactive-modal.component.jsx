import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useLazyGetTableListQuery } from "@/features/ui";
import { useDeleteCampaignMutation } from "./campaign-api-slice";
import { Api } from "@/constants";
import { ConfirmationModal } from "../ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteMenu, { data, isSuccess, isLoading }] =
    useDeleteCampaignMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder, filter } =
    useSelector((state) => state.commonTable);

  const onDelete = async () => {
    await deleteMenu({ id: selectedRow?.id, isActive: !selectedRow?.isActive });
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.Campaign,
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
      show={show}
      module="campaign"
      row={selectedRow}
      dataName={selectedRow?.name}
      isLoading={isLoading}
      onClose={onClose}
      onDelete={onDelete}
      centered
    />
  );
};
