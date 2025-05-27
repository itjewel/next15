import { Actions } from "@/features/ui";
import { parseDateTime } from "@/helper";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete) => {
  return [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Image",
      selector: (row) => {
        return row?.image ? (
          <img
            src={import.meta.env.VITE_APP_IMAGE_URL + row?.image}
            width={50}
            alt="Image"
            height={50}
          />
        ) : (
          ""
        );
      },
    },
    {
      name: "Created at",
      selector: (row) => parseDateTime(row?.createdAt),
      sortable: true,
      sortField: "createdAt",
    },
    {
      name: "Updated st",
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
            onClickHandle: () =>
              navigate(`/system-on-off-reason/edit/${row?.id}`),
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Disable" : "Enable",
            onClickHandle: () => handleDelete(row.id, !row.isActive, row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        const btnList = [
          {
            name: "Update",
            onClickHandle: () =>
              navigate(`/system-on-off-reason/edit/${row?.id}`),
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
