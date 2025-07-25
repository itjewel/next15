import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useActivateBranchMutation,
  useDeleteDeactivationTypeMutation,
} from "../api-slice";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteMenu, { data, isSuccess, isLoading }] =
    useDeleteDeactivationTypeMutation();
  const [activateBranch, { data: activateData, isSuccess: activateSuccess }] =
    useActivateBranchMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );

  const onDelete = async () => {
    const apiEndpoint =
      selectedRow.tabType === "admin"
        ? "/restaurants/api/SystemOnOff"
        : `/restaurants/api/BranchOpenCloseHistory/MakeBranchAvailableFromAdmin/${selectedRow.branchId}`;
    if (selectedRow.tabType === "admin") {
      await deleteMenu({ ...selectedRow, url: apiEndpoint });
    } else {
      await activateBranch({ branchId: selectedRow.branchId });
    }
  };

  useEffect(() => {
    if ((data && isSuccess) || (activateData && activateSuccess)) {
      toast.success(data?.message || activateData?.message);
      getList({
        url:
          selectedRow.tabType === "admin"
            ? Api.GetDeactivationSetupList
            : "/restaurants/api/SystemOnOff/GetManuallyOffBranches",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      onClose();
    }
  }, [data, activateData]);

  let names = selectedRow?.names ? selectedRow?.names?.join(", ") : "";

  return (
    <Modal
      show={show}
      centered="centered"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Activate Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {`Are you sure you want to ${
            selectedRow?.isActive ? "activate" : "deactivate"
          } `}
          <span className="fw-bold">
            {selectedRow.tabType === "admin" ? names : selectedRow.name}
          </span>
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
