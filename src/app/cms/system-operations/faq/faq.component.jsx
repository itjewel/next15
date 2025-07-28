import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Filter } from "./filter.component";
const Title = "FAQ";
const breadcrumbItems = [{ name: "Faq" }];

export function Faq() {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({ id: null, isActive: null });
  const [row, setRow] = useState();
  const [showFilter, setShowFilter] = useState(false);

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  function handleDelete(id, isActive, row) {
    setSelected({ id, isActive });
    setRow(row);
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id: id });
  }

  const columns = Columns(navigate, handleDelete, handleEdit);

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton btnName="Create" to="/faq/create" />}
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <CommonTable
        columns={columns}
        url={Api.GetFaqLists}
        filterComp={<Filter showFilter={showFilter} />}
      />
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
}
