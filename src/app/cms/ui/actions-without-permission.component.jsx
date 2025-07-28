import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

const popperConfig = {
  strategy: "fixed",
};

export const ActionsWithoutPermission = ({
  btnList = [],
  isActive,
  isApprove,
}) => {
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
            if (btn?.btnType == "update" && !isActive) {
              return;
            } else if (btn?.btnType == "approve" && isApprove) {
              return;
            }
            if (btn?.isShow === false) {
              return;
            } else {
              return (
                <Dropdown.Item
                  key={index}
                  eventKey={index}
                  onClick={() => btn.onClickHandle()}
                  className="py-2"
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
