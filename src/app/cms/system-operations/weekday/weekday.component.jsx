import { CommonTable, LinkButton } from "../../ui";
import { Api } from "@/constants";
import { CommonLayout } from "../../layouts";
import { Columns } from "./columns";
import { useState } from "react";
import { WeekdayFilter } from "./weekday-filter";
import { useToggle } from "react-use";
import { CreateEditModal } from "./create/create-edit-modal.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";

const breadcrumbItems = [{ name: "Weekday", url: "/weekday" }];

export const Weekday = () => {
  const [showModal, toggleShowModal] = useToggle();
  const [on, toggle] = useToggle();
  const [row, setRow] = useState();
  const [id, setId] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

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

  const columns = Columns({ handleEdit, handleDelete });

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    setRow(row);
    toggle();
  }

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Weekday"
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        url={Api.GetListOfWeekDay}
        columns={columns}
        filterComp={<WeekdayFilter showFilter={showFilter} />}
        showActiveInactive={false}
      />

      {/* Create Modal */}
      {showModal && (
        <CreateEditModal
          show={showModal}
          onClose={handleShowModalClose}
          id={id}
        />
      )}

      {/* Delete Modal */}
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
