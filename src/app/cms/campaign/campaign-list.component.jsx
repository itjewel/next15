import { Api } from "@/constants";
import { routeNames } from "@/constants/route-names";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: lang("campaign") }];

export const CampaignList = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [showFilter, setShowFilter] = useState(false);

  const [selected, setSelected] = useState({});

  function handleClose() {
    setSelected({});
    toggle();
  }

  function handleEdit(row) {
    navigate(`/campaign/edit/${row?.id}`);
  }

  function handleDelete(row) {
    setSelected(row);
    toggle();
  }

  const columns = Columns(handleDelete, handleEdit);
  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title={lang("campaign")}
      BtnComp={<LinkButton to={routeNames.campaign_create} btnName="Create" />}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      collapsible={true}
    >
      <CommonTable
        url={Api.Campaign}
        columns={columns}
        filterComp={<Filter showFilter={showFilter} />}
      />

      {/* Status Modal */}
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
