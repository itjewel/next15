import { ConfirmationModal, useLazyGetTableListQuery } from "@/features/ui";
import { useSelector } from "react-redux";
import { useDeleteSpecialHourMutation } from "./special-hour-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { useGetAllSPecialHourTypeQuery } from "@/features/api";
import { useState } from "react";

export const ActiveInactiveModal = ({ show, selectedRow, row, onClose }) => {
  const {
    pageNumber,
    itemsPerPage,
    isActive,
    sortBy,
    sortOrder,
    isLoading,
    filter,
  } = useSelector((state) => state.commonTable);
  const [dataName, setDataName] = useState();
  const [getList] = useLazyGetTableListQuery();
  const [deleteItem, { data: deleteData, isLoading: deleteLoading, error }] =
    useDeleteSpecialHourMutation();
  const { data: specialHourType } = useGetAllSPecialHourTypeQuery();
  useEffect(() => {
    specialHourType?.items?.map((item) => {
      if (item?.value == row?.specialHourTypeId) {
        setDataName(item?.label);
      }
    });
  }, [specialHourType]);
  console.log(specialHourType);
  function onDelete() {
    deleteItem(selectedRow);
  }
  useEffect(() => {
    if (deleteData) {
      toast.success(deleteData?.message);
      getList({
        url: Api.GetSpecialHourList,
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
  }, [deleteData]);
  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);
  return (
    <ConfirmationModal
      row={row}
      dataName={dataName}
      module={"special hour"}
      centered
      show={show}
      isLoading={deleteLoading}
      onClose={onClose}
      onDelete={onDelete}
    />
  );
};
