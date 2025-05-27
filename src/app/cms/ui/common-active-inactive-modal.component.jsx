import { Button, Modal, Spinner } from "react-bootstrap";

export const ConfirmationModal = ({
  row,
  dataName,
  module,
  centered = false,
  show,
  size = "md",
  isLoading = false,
  onClose,
  onDelete,
  ...rest
}) => {
  return (
    <Modal
      show={show}
      size={size}
      centered={centered}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onClose}
      {...rest}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`${
          row?.isActive == true ? "Disable" : "Enable"
        } ${module}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {`Are you sure you want to ${row?.isActive ? "disable" : "enable"} `}
          <span className="fw-bold">{`${dataName}`}</span>
          <span> ?</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onClose}
          disabled={isLoading}
          style={{ minwidth: "5.5rem" }}
        >
          No
        </Button>
        <Button
          variant="outline-primary"
          onClick={onDelete}
          disabled={isLoading}
          style={{ minwidth: "5.5rem" }}
        >
          {isLoading && <Spinner size="sm" className="me-2" />}
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
