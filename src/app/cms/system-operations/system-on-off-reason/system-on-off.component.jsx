import { Api } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { SystemOnOffFilter } from "./system-on-off-filter";

const breadcrumbItems = [
  { name: "System On & Off Reason", url: "/system-on-off-reason" },
];

export const SystemOnOffReason = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [row, setRow] = useState();
  const [showFilter, setShowFilter] = useState(false);
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
  const columns = Columns(navigate, handleDelete);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="System on & off reason"
      BtnComp={
        <LinkButton btnName="Create" to="/system-on-off-reason/create" />
      }
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        url={Api.GetReasonListOfSystemOnOff}
        columns={columns}
        filterComp={<SystemOnOffFilter showFilter={showFilter} />}
      />

      <ActiveInactiveModal
        row={row}
        show={on}
        onClose={handleClose}
        selectedRow={selected}
      />
    </CommonLayout>
  );
};
