import { Api, useDelete, usePut } from "features/api";
import { CommonLayout } from "features/layouts";
import { ConfirmationDialog, CreateButton, DataTable } from "features/ui";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useToggle } from "react-use";
import { PlaceholderCreate } from "./create";
import { PlaceholderListColumn } from "./placeholder-column";
import { PlaceholderTopFilter } from "./placeholder-filter-top.component";
import {
  PlaceholderActiveInactive,
  PlaceholderActiveInactiveResponse,
  PlaceholderTurnOnResponse,
  PlaceholderTurnOnTurnOff,
  SinglePlaceholder,
} from "./placeholder.type";

export const Placeholder = () => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [payloadData, setPayloadData] = useState<PlaceholderActiveInactive>();
  const [isTurnOnPopupVisible, setTurnPopupVisible] = useState<boolean>(false);
  const [turnOnPayloadData, setTurnOnPayloadData] =
    useState<PlaceholderTurnOnTurnOff>();
  const [refetch, toggleRefetch] = useToggle(false);
  const [visible, setVisible] = useToggle(false);
  const [singlePlaceholder, setSinglePlaceholder] =
    useState<SinglePlaceholder | null>(null);

  const {
    trigger,
    data: placeholderIsActiveResponse,
    error,
    isMutating,
  } = useDelete<unknown, PlaceholderActiveInactiveResponse>(
    `${Api.PlaceholderDelete}/${
      payloadData?.id
    }?isActive=${!payloadData?.isActive}`
  );
  const {
    trigger: turnOnTrigger,
    data: placeholderIsTurnOnResponse,
    error: placeholderIsTurnOnError,
    isMutating: isMutatingPlaceholderTurnOn,
  } = usePut<unknown, PlaceholderTurnOnResponse>(
    `${Api.PlaceholderUpdate}?id=${turnOnPayloadData?.id}&actionType=${turnOnPayloadData?.actionType}`
  );

  const handleConfirm = async () => {
    setPopupVisible(false);
    await trigger(undefined);
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleActiveInactive = (payload: PlaceholderActiveInactive) => {
    setPopupVisible(true);
    setPayloadData(payload);
  };

  const handleCreate = () => {
    setSinglePlaceholder(null);
    setVisible(true);
  };

  const handleEdit = (data: SinglePlaceholder) => {
    setSinglePlaceholder(data);
    setVisible(true);
  };

  const columns = PlaceholderListColumn(handleActiveInactive, handleEdit);

  useEffect(() => {
    if (!isMutating && placeholderIsActiveResponse?.status) {
      toast.success(placeholderIsActiveResponse?.message);
      toggleRefetch(true);
    } else if (!isMutating && !placeholderIsActiveResponse?.status) {
      toast.error(error?.message);
    }
  }, [placeholderIsActiveResponse, error]);

  useEffect(() => {
    if (!isMutatingPlaceholderTurnOn && placeholderIsTurnOnResponse?.status) {
      toast.success(placeholderIsTurnOnResponse?.message);
      toggleRefetch(true);
    } else if (
      !isMutatingPlaceholderTurnOn &&
      !placeholderIsTurnOnResponse?.status
    ) {
      toast.error(placeholderIsTurnOnError?.message);
    }
  }, [placeholderIsTurnOnResponse, placeholderIsTurnOnError]);

  function ConfirmModalBody() {
    return (
      <p>
        Are you sure you want to {payloadData?.isActive ? "disable" : "enable"}{" "}
        {payloadData?.name}?
      </p>
    );
  }

  function ConfirmModalTitle() {
    return payloadData?.isActive ? "Disable Placeholder" : "Enable Placeholder";
  }

  return (
    <CommonLayout
      title="Place Holder list"
      BtnComp={
        <CreateButton onClick={handleCreate} outlined>
          Create
        </CreateButton>
      }
    >
      <DataTable
        showGridlines
        url={Api.PlaceholderGetAll}
        columns={columns || []}
        topFilter={PlaceholderTopFilter}
        hideSearch
        refetch={refetch}
        onDataLoaded={() => toggleRefetch(false)}
      />

      <ConfirmationDialog
        title={<ConfirmModalTitle />}
        visible={isPopupVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        body={<ConfirmModalBody />}
      />

      <PlaceholderCreate
        show={visible}
        onHide={setVisible}
        info={singlePlaceholder}
        onDataTableRefetch={toggleRefetch}
      />
    </CommonLayout>
  );
};
