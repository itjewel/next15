import { parseDateTime } from "@/helper";
import moment from "moment";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUnlock } from "react-icons/fa";
import { Actions } from "../ui";

export const Columns = (handleDelete, handleEdit) => {
  return [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Start date",
      selector: (row) => moment(row?.startDate).format("YYYY-MM-DD hh:mm a"),
      sortable: true,
      sortField: "startDate",
    },
    {
      name: "End date",
      selector: (row) => moment(row?.endDate).format("YYYY-MM-DD hh:mm a"),
      sortable: true,
      sortField: "endDate",
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
      style: { overflow: "visible !important" },
      selector: (row) => {
        const list = [
          {
            name: "Update",
            onClickHandle: () => handleEdit(row),
            icon: <AiFillEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Disable" : "Enable",
            onClickHandle: () => handleDelete(row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        const disableList = [
          {
            name: "Update",
            icon: <AiFillEdit />,
            onClickHandle: () => handleEdit(row),
          },
          {
            name: "Enable",
            icon: <FaUnlock />,
            onClickHandle: () => handleDelete(row),
          },
        ];
        if (!row.isActive) {
          return <Actions btnList={disableList} isActive={row.isActive} />;
        }
        {
          return <Actions btnList={list} isActive={row.isActive} />;
        }
      },
    },
  ];
};
