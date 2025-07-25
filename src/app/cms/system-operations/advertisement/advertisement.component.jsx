import { CommonTable, LinkButton } from "../../ui";
import { CommonLayout } from "../../layouts";
import { Api } from "@/constants";
import { useState } from "react";
import { AdvertisementFilter } from "./advertisement.filter";
import { useNavigate } from "react-router-dom";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { useToggle } from "react-use";
import { Columns } from "./columns";

const breadcrumbItems = [{ name: "Advertisement", url: "/advertisement" }];

export const Advertisement = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });
  const [row, setRow] = useState();

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
      title: null,
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
      title="Advertisement"
      BtnComp={<LinkButton btnName="Create" to="/advertisement/create" />}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      collapsible={true}
    >
      <CommonTable
        url={Api.GetListOfAdvertisement}
        columns={columns}
        filterComp={<AdvertisementFilter showFilter={showFilter} />}
      />

      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
          row={row}
          dataName={row?.title}
        />
      )}
    </CommonLayout>
  );
};
