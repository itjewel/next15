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
  ];
};
