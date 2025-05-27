import { Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { usePagePermission } from ".";

// THIS Component permission works only on List Page;
// If you are using this component not in list,  page permission will not work
export const UpdateButton = ({ onClick }) => {
  const permissions = usePagePermission();

  if (!permissions?.edit) return null;

  return (
    <Button variant="outline-primary" onClick={onClick}>
      <AiFillEdit className="me-1" />
      <span>Update</span>
    </Button>
  );
};
