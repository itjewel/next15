import { Api } from "@/constants";
import { useState } from "react";
import { useToggle } from "react-use";
import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { Columns } from "./columns";
import { RiderTutorialModal } from "./create/rider-tutorial-modal.component";
import { ActiveInactiveModal } from "./rider-tutorial-active-inactive";
import { RiderTutorialFilter } from "./rider-tutorial-filter.component";

export const RiderTutorial = () => {
  const [formModal, toggleFormModal] = useToggle();
  const [on, toggle] = useToggle();
  const [id, setId] = useState("");
  const [row, setRow] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleEdit(id) {
    setId(id);
    toggleFormModal();
  }

  function handleFormModalClose() {
    setId("");
    toggleFormModal();
  }

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleDelete(row) {
    setSelected({ id: row.id, isActive: !row.isActive });
    setRow(row);
    toggle();
  }

  const columns = Columns(handleEdit, handleDelete);

  return (
    <CommonLayout
      title="Rider tutorial"
      BtnComp={
        <LinkButton btnName="Create" onClick={() => toggleFormModal()} />
      }
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        url={Api.RiderTutorialList}
        columns={columns}
        filterComp={<RiderTutorialFilter showFilter={showFilter} />}
      />

      {formModal && (
        <RiderTutorialModal
          show={formModal}
          onClose={handleFormModalClose}
          id={id}
        />
      )}

      {on && (
        <ActiveInactiveModal
          row={row}
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
};
