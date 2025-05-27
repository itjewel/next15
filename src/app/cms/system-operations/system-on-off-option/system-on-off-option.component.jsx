import { CommonLayout } from "@/features/layouts";
import { Actions, CommonTable, LinkButton } from "@/features/ui";
import { parseDateTime } from "@/helper";
import { useState } from "react";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Filter } from "./filter.component";

const breadcrumbItems = [
  { name: "Foodi" },
  { name: "System Operation" },
  { name: "System On Off Option" },
];

export const SystemOnOffOption = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [row, setRow] = useState();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleDelete(id, isActive, row) {
    setSelected({ id, isActive });
    setRow(row);
    toggle();
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Reason",
      selector: (row) => row.systemOnOffReason?.name,
    },
    {
      name: "Zone",
      selector: (row) =>
        row?.systemOptionDetails?.map((item) => item?.zone?.name).join(","),
    },
    {
      name: "System off",
      selector: (row) => (row?.isSystemOff ? "Yes" : "No"),
      sortable: true,
      sortField: "isSystemOff",
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
              navigate(`/system-on-off-option/edit/${row?.id}`),
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
              navigate(`/system-on-off-option/edit/${row?.id}`),
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

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="System on off option"
      BtnComp={
        <LinkButton btnName="Create" to="/system-on-off-option/create" />
      }
    >
      <CommonTable
        url={"/system-operations/api/SystemOnOffOption"}
        columns={columns}
        filterComp={<Filter />}
      />

      {on && (
        <ActiveInactiveModal
          row={row}
          dataName={row?.name}
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
};
