import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const actionsNames = {
  disable: "delete",
  duplicate: "duplicate",
  delete: "delete",
  update: "edit",
  view: "details",
  approve: "approve",
  invoice: "invoice",
  "re-assign rider": "re-assign rider",
  "assign rider": "assign rider",
  "update order": "update order",
  "rider invoice": "rider invoice",
  "restaurant invoice": "restaurant invoice",
  "view order history": "view order history",
  "cancel order": "cancel order",
  "change status": "change status",
};

const popperConfig = {
  strategy: "fixed",
};

export const Actions = ({ btnList = [], isActive, isApprove }) => {
  const { pathname } = useLocation();
  const { permission } = useSelector((state) => state.userCredential);

  const permissions = permission?.[pathname] ?? {};

  const checkHasPermission = (btnName) => {
    // if return false means user doesn't have any permission;

    if (
      btnName === "user invoice" ||
      btnName === "restaurant invoice" ||
      btnName === "rider invoice"
    ) {
      if (!permissions?.invoice) {
        return false;
      }
    }

    if (btnName === "disable" || btnName === "delete") {
      // delete
      if (!permissions?.delete) {
        return false;
      }
    }

    const currentActionName = actionsNames?.[btnName]?.toLowerCase() || "";

    if (currentActionName) {
      if (!permissions?.[currentActionName]) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          className="styleDropdown"
          id="dropdown-menu-align-end"
          variant="outline-primary"
        >
          <FaEllipsisV />
        </Dropdown.Toggle>

        <Dropdown.Menu
          align="end"
          variant="outline-primary styleDropdownItems"
          popperConfig={popperConfig}
        >
          {btnList.map((btn, index) => {
            if (btn.btnType == "update" && !isActive) {
              return;
            } else if (btn.btnType == "approve" && isApprove) {
              return;
            } else {
              const { name } = btn ?? {};
              if (!checkHasPermission(name?.toLowerCase()?.trim() || "")) {
                return null;
              }

              return (
                <Dropdown.Item
                  key={index}
                  eventKey={index}
                  onClick={() => btn.onClickHandle()}
                  className="py-2"
                  disabled={btn?.isDisabled ? true : false}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="text-nowrap"
                  >
                    {btn.icon}
                    <span className="ps-2">{btn.name}</span>
                  </div>
                </Dropdown.Item>
              );
            }
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
