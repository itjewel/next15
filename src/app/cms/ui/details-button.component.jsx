import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { usePagePermission } from ".";

export const DetailsButton = ({ onClick }) => {
  const permissions = usePagePermission();
  if (!permissions?.details) {
    return null;
  }

  return (
    <Button variant="outline-primary" onClick={onClick}>
      <FaEye /> View
    </Button>
  );
};
