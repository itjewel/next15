import { Button } from "react-bootstrap";
import { FaLock, FaUnlock } from "react-icons/fa";
import { usePagePermission } from ".";

export const DisableButton = ({ row, onClick }) => {
  const permissions = usePagePermission();

  if (permissions?.delete || permissions?.disable) {
    return (
      <Button
        variant={row?.isActive ? "outline-secondary" : "outline-success"}
        onClick={onClick}
      >
        {row?.isActive ? <FaLock /> : <FaUnlock />}
        <span className="ps-2">{row?.isActive ? "Disable" : "Enable"}</span>
      </Button>
    );
  }

  return null;
};
