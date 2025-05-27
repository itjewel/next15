import { useGetAllSPecialHourTypeQuery } from "@/features/api";
import { Actions } from "@/features/ui";
import { formatTime, parseDateTime } from "@/helper";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleDelete, handleEdit) => {
  const { data: specialHourType } = useGetAllSPecialHourTypeQuery();

  return [
    {
      name: "Special hour type",
      selector: (row) =>
        specialHourType?.items?.map((item) =>
          item?.value == row?.specialHourTypeId ? item?.label : ""
        ),
      sortable: true,
      sortField: "specialHourTypeId",
    },
    {
      name: "Start time",
      selector: (row) => formatTime(row?.startTime),
      sortable: true,
      sortField: "startTime",
    },
    {
      name: "End time",
      selector: (row) => formatTime(row?.endTime),
      sortable: true,
      sortField: "endTime",
    },
    {
      name: "Created at",
      selector: (row) => parseDateTime(row?.createdAt),
      sortable: true,
      sortField: "createdAt",
    },
    {
      name: "Updated at",
      selector: (row) => parseDateTime(row?.updatedAt),
      sortable: true,
      sortField: "updatedAt",
    },
    {
      name: "Actions",
      allowOverflow: true,
      style: {
        overflow: "visible !important",
      },
      selector: (row) => {
        const list = [
          {
            name: "Update",
            icon: <FaEdit />,
            onClickHandle: () => {
              handleEdit(row?.id);
            },
          },
          {
            name: "Disable",
            icon: <FaLock />,
            onClickHandle: () => {
              handleDelete(row?.id, !row?.isActive, row);
            },
          },
        ];
        const disableList = [
          {
            name: "Enable",
            icon: <FaUnlock />,
            onClickHandle: () => {
              handleDelete(row?.id, !row?.isActive, row);
            },
          },
        ];
        if (row?.isActive) {
          return <Actions btnList={list} isActive={row?.isActive} />;
        } else {
          return <Actions btnList={disableList} isActive={row?.isActive} />;
        }
      },
    },
  ];
};
