import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveStatus } from "./common-table-slice";

export const TableActiveInactiveTab = () => {
  const { isActive } = useSelector((state) => state.commonTable);
  const dispatch = useDispatch();
  const activeKey = [isActive ? "enable" : "disable"];
  return (
    <Tabs
      activeKey={activeKey}
      style={{
        borderBottom: "0px",
      }}
      onSelect={(e) => {
        if (e === "enable") {
          dispatch(changeActiveStatus(true));
        } else {
          dispatch(changeActiveStatus(false));
        }
      }}
    >
      <Tab eventKey="enable" title="Enabled" className="enable" />
      <Tab eventKey="disable" title="Disabled" className="disable" />
    </Tabs>
  );
};
