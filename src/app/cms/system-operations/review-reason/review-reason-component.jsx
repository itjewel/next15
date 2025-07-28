import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { ReviewReasonCreate } from "./create/review-reason-create-component";
import { EnableDisableModal } from "./enable-disable-modal";
import { ReviewReasonFilter } from "./review-reason-filter";
const title = "Review reason";
export const ReviewReasonComponent = () => {
  const [on, toggle] = useToggle();
  const [onStatus, toggleStatus] = useToggle();
  const [selected, setSelected] = useState({ id: null, isActive: null });
  const [row, setRow] = useState();
  const [showFilter, setShowFilter] = useState(false);
  function handleDelete(id, isActive, row) {
    setSelected({ id, isActive });
    setRow(row);
    toggleStatus();
  }

  function handleEdit(id) {
    setSelected({ id: id });
    toggle();
  }

  function handleClose() {
    setSelected({ id: null });
    toggle();
  }

  function handleDeleteClose() {
    setSelected({ id: null, isActive: null });
    setRow();
    toggleStatus();
  }
  const columns = Columns(handleEdit, handleDelete);

  return (
    <CommonLayout
      title={title}
      BtnComp={<LinkButton btnName="Create" onClick={() => toggle()} />}
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        url={"/system-operations/api/ReviewReason"}
        columns={columns}
        filterComp={<ReviewReasonFilter showFilter={showFilter} />}
      />

      <ReviewReasonCreate
        show={on}
        onClose={handleClose}
        selectedRow={selected}
      />

      <EnableDisableModal
        show={onStatus}
        onClose={handleDeleteClose}
        selectedRow={selected}
        row={row}
      />
    </CommonLayout>
  );
};
