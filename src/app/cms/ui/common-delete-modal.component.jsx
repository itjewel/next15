import { Button, Modal } from "react-bootstrap";

export const DeleteModal = ({
  dataName,
  module,
  show,
  onClose,
  onDelete,
  centered = false,
  size = "md",
  isLoading = false,
  ...rest
}) => {
  return (
    <Modal
      show={show}
      size={size}
      centered={centered}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      {...rest}
    >
      <Modal.Header>
        <Modal.Title>Delete {module}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete{" "}
        <span className="fw-bold">{dataName}</span>?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onClose}
          disabled={isLoading}
          style={{ width: "90px" }}
        >
          No
        </Button>
        <Button
          variant="outline-primary"
          onClick={onDelete}
          disabled={isLoading}
          style={{ width: "90px" }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
