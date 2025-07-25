import { Actions } from "@/features/ui";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleEdit, handleDelete) => {
  const allUser = [
    { label: "Rider", value: 1 },
    {
      label: "Restaurant",
      value: 2,
    },
    {
      label: "CMS",
      value: 3,
    },
    {
      label: "Customer",
      value: 4,
    },
  ];

  return [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Reviewed by",
      selector: (row) =>
        allUser?.map((item) =>
          item?.value == row?.reviewBy ? item?.label : ""
        ),
      sortable: true,
      sortField: "reviewBy",
    },
    {
      name: "Type",
      selector: (row) => (row?.type == 1 ? "Good" : "Bad"),
      sortable: true,
      sortField: "type",
    },
    {
      allowOverflow: true,
      style: { overflow: "visible !important" },
      name: "Actions",
      selector: (row) => {
        const list = [
          {
            name: "Update",
            icon: <FaEdit />,
            onClickHandle: () => {
              handleEdit(row.id);
            },
          },
          {
            name: row.isActive == true ? "Disable" : "Enable",
            icon: row.isActive == true ? <FaLock /> : <FaUnlock />,
            onClickHandle: () => {
              handleDelete(row.id, !row.isActive, row);
            },
          },
        ];

        return <Actions btnList={list} isActive={row?.isActive} />;
      },
    },
  ];
};
