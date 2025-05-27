import { Actions } from "@/features/ui";
import { parseDateTime } from "@/helper";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleEdit, handleDelete) => {
  return [
    {
      name: "Title",
      selector: (row) => row?.title,
      sortable: true,
      sortField: "title",
    },
    {
      name: "Video URL",
      selector: (row) => row?.videoURL,
      sortable: true,
      sortField: "videoURL",
    },

    {
      name: "Created at",
      sortable: true,
      sortField: "createdAt",
      selector: (row) => parseDateTime(row?.createdAt),
    },
    {
      name: "Updated at",
      sortable: true,
      sortField: "updatedAt",
      selector: (row) => parseDateTime(row?.updatedAt),
    },
    {
      name: "Actions",
      allowOverflow: true,
      style: { overflow: "visible !important" },
      selector: (row) => {
        const list = [
          {
            name: "Update",
            onClickHandle: () => handleEdit(row?.id),
            icon: <FaEdit />,
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
            onClickHandle: () => handleEdit(row?.id),
            icon: <FaEdit />,
          },
          {
            name: "Enable",
            onClickHandle: () => handleDelete(row),
            icon: <FaUnlock />,
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
