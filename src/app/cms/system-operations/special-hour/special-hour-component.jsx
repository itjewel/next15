import { Api } from "@/constants";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { Columns } from "./columns";
import { SpecialHourFilter } from "./filter";
import { useStartTyping, useToggle } from "react-use";
import { SpecialHourCreate } from "./create/special-hour-create.component";
import { useState } from "react";
import { ActiveInactiveModal } from "./active-inactive-modal-component";
export const SpecialHourComponent = () => {
  const [row, setRow] = useState();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const [showFilter, setShowFilter] = useState(false);

  function handleDelete(id, isActive, row) {
    setSelected({ id, isActive });
    setRow(row);
    toggle();
  }

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id: id });
    createToggle();
  }
  function handleEditClose() {
    setSelected({ id: null });
    createToggle();
  }
  const columns = Columns(handleDelete, handleEdit);
  return (
    <CommonLayout
      title="Special hour"
      BtnComp={<LinkButton btnName="Create" onClick={() => createToggle()} />}
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        url={Api.GetSpecialHourList}
        columns={columns}
        filterComp={<SpecialHourFilter showFilter={showFilter} />}
      />
      {onCreate && (
        <SpecialHourCreate
          show={onCreate}
          selectedRow={selected}
          onClose={handleEditClose}
        />
      )}
      {on && (
        <ActiveInactiveModal
          show={on}
          selectedRow={selected}
          row={row}
          onClose={handleClose}
        />
      )}
    </CommonLayout>
  );
};
