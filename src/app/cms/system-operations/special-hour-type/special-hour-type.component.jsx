import { Api } from "@/constants";
import { useState } from "react";
import { useToggle } from "react-use";
import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { CreateEditModal } from "./create/create-edit-modal.component";
import { SpecialHourTypeFilter } from "./special-hour-type-filter";

const breadcrumbItems = [{ name: "Special Hour Type", url: "/overtime" }];

export const SpecialHourType = () => {
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });
  const [showModal, toggleShowModal] = useToggle();
  const [on, toggle] = useToggle();
  const [id, setId] = useState("");
  const [row, setRow] = useState();
  const [showFilter, setShowFilter] = useState(false);

  function handleEdit(id) {
    setId(id);
    toggleShowModal();
  }

  function handleShowModalClose() {
    setId("");
    toggleShowModal();
  }

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

  const columns = Columns({ handleEdit, handleDelete });

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Special hour type"
      BtnComp={
        <LinkButton btnName="Create" onClick={() => toggleShowModal()} />
      }
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        url={Api.GetListOfSpecialHourType}
        columns={columns}
        filterComp={<SpecialHourTypeFilter showFilter={showFilter} />}
      />

      <CreateEditModal
        show={showModal}
        onClose={handleShowModalClose}
        id={id}
      />

      {/* Delete Modal */}

      <ActiveInactiveModal
        row={row}
        show={on}
        onClose={handleClose}
        selectedRow={selected}
      />
    </CommonLayout>
  );
};
