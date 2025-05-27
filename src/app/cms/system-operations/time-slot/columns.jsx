import { useGetAllWeekdayOptionsQuery } from "@/features/api";
import { Actions } from "@/features/ui";
import { formatTime, parseDateTime } from "@/helper";
import { Button } from "react-bootstrap";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (handleDelete, navigate) => {
  const { data: weekDay } = useGetAllWeekdayOptionsQuery();
  return [
    {
      name: "Weekday",
      selector: (row) => row?.weekDayName,
      sortable: true,
      sortField: "weekDayName",
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
      style: { overflow: "visible !important" },
      selector: (row) => {
        const list = [
          {
            name: "Update",
            onClickHandle: () =>
              navigate(`/system-operation-time-slot/edit/${row?.id}`),
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row.isActive ? "Disable" : "Enable",
            onClickHandle: () => handleDelete(row.id, !row.isActive, row),
            icon: row.isActive ? <FaLock /> : <FaUnlock />,
          },
        ];
        if (!row.isActive) {
          return (
            <Button
              variant={
                row?.isActive == true ? "outline-danger" : "outline-success"
              }
              onClick={() => {
                handleDelete(row?.id, !row?.isActive, row);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {<FaUnlock />}
                <span className="ps-2">{"Enable"}</span>
              </div>
            </Button>
          );
        } else {
          return <Actions btnList={list} isActive={row.isActive} />;
        }
      },
    },
  ];
};
