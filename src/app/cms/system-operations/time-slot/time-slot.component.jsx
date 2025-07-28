import { Api } from "@/constants";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { Filter } from "./filter.component";

const title = "System operation time slot";
const breacrumbItems = [{ name: "Time slot" }];

export const SystemTimeslot = () => {
  const [on, toggle] = useToggle();
  const [row, setRow] = useState();
  const [selected, setSelected] = useState({ id: null, isActive: null });
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  function handleDelete(id, isActive, row) {
    setSelected({ id, isActive });
    setRow(row);
    toggle();
  }

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  const columns = Columns(handleDelete, navigate);
  return (
    <CommonLayout
      title={title}
      breadcrumbItems={breacrumbItems}
      BtnComp={
        <LinkButton btnName="Create" to="/system-operation-time-slot/create" />
      }
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        columns={columns}
        url={Api.GetPlatformTimeSlot}
        filterComp={<Filter showFilter={showFilter} />}
      />
      {on && (
        <ActiveInactiveModal
          row={row}
          show={on}
          selectedRow={selected}
          onClose={handleClose}
        />
      )}
    </CommonLayout>
  );
};
