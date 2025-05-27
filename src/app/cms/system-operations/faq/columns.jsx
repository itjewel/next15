import { Actions } from "@/features/ui";
import { parseDateTime } from "@/helper";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete, handleEdit) => {
  return [
    {
      name: "User type",
      selector: (row) => row?.userTypeId,
      sortable: true,
      sortField: "userTypeId",
    },
    {
      name: "Question",
      selector: (row) => row?.question,
      sortable: true,
      sortField: "question",
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
            onClickHandle: () => {
              navigate(`/faq/edit/${row?.id}`);
            },
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Disable" : "Enable",
            onClickHandle: () => handleDelete(row?.id, !row?.isActive, row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        const disableList = [
          {
            name: "Update",
            icon: <FaEdit />,
            onClickHandle: () => {
              navigate(`/faq/edit/${row?.id}`);
            },
          },
          {
            name: "Enable",
            icon: <FaUnlock />,
            onClickHandle: () => {
              handleDelete(row?.id, !row?.isActive, row);
            },
          },
        ];
        if (!row.isActive) {
          return <Actions btnList={disableList} isActive={row?.isActive} />;
        } else {
          return <Actions btnList={list} isActive={row?.isActive} />;
        }
      },
    },
  ];
};
