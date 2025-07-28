import { Actions } from "@/features/ui";
import { parseDateTime } from "@/helper";
import moment from "moment";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

// Columns for "De-Activated by Admin"
export const ColumnsAdmin = (navigate, handleDelete) => {
  return [
    {
      name: "Name",
      selector: (row) => (row.names ? row.names.join(", ") : ""),
    },
    {
      name: "Type",
      selector: (row) => row?.typeName,
    },
    {
      name: "Reason",
      selector: (row) => row?.reason,
    },
    {
      name: "Start date",
      selector: (row) => moment(row?.startDate).format("DD-MM-YYYY hh:mm a"),
    },
    {
      name: "End date",
      selector: (row) => moment(row?.endDate).format("DD-MM-YYYY hh:mm a"),
    },
    {
      name: "Created at",
      selector: (row) => parseDateTime(row?.createdAt),
    },
    {
      name: "Updated at",
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
            onClickHandle: () =>
              navigate(`/restaurant-activation-deactivation/edit/${row.id}`),
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Activate" : "Deactivate",
            onClickHandle: () => handleDelete(row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        return <Actions btnList={list} isActive={row.isActive} />;
      },
    },
  ];
};

// Columns for "De-Activated by Branch"
export const ColumnsBranch = (navigate, handleDelete) => {
  return [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Reason",
      selector: (row) => row?.reason,
    },
    {
      name: "Start date",
      selector: (row) => moment(row?.startDate).format("DD-MM-YYYY hh:mm a"),
    },
    {
      name: "End date",
      selector: (row) => moment(row?.endDate).format("DD-MM-YYYY hh:mm a"),
    },

    {
      name: "Created at",
      selector: (row) => parseDateTime(row?.createdAt),
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
              navigate(
                `/restaurant-activation-deactivation/edit/${row.id}?tabType=branch`
              ),
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Activate" : "Deactivate",
            onClickHandle: () => handleDelete(row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        return <Actions btnList={list} isActive={row.isActive} />;
      },
    },
  ];
};
