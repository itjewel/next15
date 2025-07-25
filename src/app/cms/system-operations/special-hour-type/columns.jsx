import { Button } from "react-bootstrap";
import { Actions } from "@/features/ui";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";
import { parseDateTime } from "@/helper";

export const Columns = ({ handleEdit, handleDelete }) => {
  return [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      sortField: "name",
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
            onClickHandle: () => handleEdit(row.id),
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Disable" : "Enable",
            onClickHandle: () => handleDelete(row?.id, !row.isActive, row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        const btnList = [
          {
            name: "Update",
            onClickHandle: () => handleEdit(row.id),
            icon: <FaEdit />,
          },
          {
            name: "Enable",
            onClickHandle: () => handleDelete(row?.id, !row?.isActive, row),
            icon: <FaUnlock />,
          },
        ];
        if (!row.isActive) {
          return <Actions btnList={btnList} isActive={row.isActive} />;
        } else {
          return <Actions btnList={list} isActive={row.isActive} />;
        }
      },
    },
  ];
};
