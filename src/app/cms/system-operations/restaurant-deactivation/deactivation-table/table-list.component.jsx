import { Api } from "@/constants";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { ColumnsAdmin, ColumnsBranch } from "./column";
import { ActiveInactiveModal } from "./deactivation-active-inactive-modal.component";
import { DeactivationFilter } from "./deactivation-filter.component";

export const RestaurantDeactivationList = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [showFilter, setShowFilter] = useState(false);
  const [selected, setSelected] = useState({ id: null, isActive: null });
  const [activeTab, setActiveTab] = useState("admin");

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  function handleDelete(row) {
    setSelected({ ...row, tabType: activeTab });
    toggle();
  }

  return (
    <CommonLayout
      title={"Deactivated Restaurant List"}
      BtnComp={
        <LinkButton
          to={"/restaurant-activation-deactivation/create"}
          btnName={"Deactivate"}
        />
      }
      collapsible={true}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    >
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Tab eventKey="admin" title="De-Activated by Admin">
          <CommonTable
            url={Api.GetDeactivationSetupList}
            columns={ColumnsAdmin(navigate, handleDelete)}
            filterComp={<DeactivationFilter showFilter={showFilter} />}
            showActiveInactive={false}
          />
        </Tab>
        <Tab eventKey="branch" title="De-Activated by Branch">
          <CommonTable
            url="/restaurants/api/SystemOnOff/GetManuallyOffBranches"
            columns={ColumnsBranch(navigate, handleDelete)}
            filterComp={<DeactivationFilter showFilter={showFilter} />}
            showActiveInactive={false}
          />
        </Tab>
      </Tabs>
      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
};
