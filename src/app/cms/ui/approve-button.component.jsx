import { Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export const ApproveButton = ({ onClick }) => {
  // @TODO: NEED TO ADD PERMISSION

  return (
    <Button
      variant="outline-primary"
      onClick={onClick}
      className="d-flex align-items-center"
    >
      <FaCheck /> <span className="ps-2">Approve</span>
    </Button>
  );
};
