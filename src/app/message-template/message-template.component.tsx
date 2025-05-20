import { Api, useDelete, usePut } from "features/api";
import { CommonLayout } from "features/layouts";
import { ConfirmationDialog, CreateButton, DataTable } from "features/ui";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useToggle } from "react-use";
import { MessageTemplateCreate } from "./create";
import { MessageTemplateListColumn } from "./message-template-column";
import { MessageTemplateTopFilter } from "./message-template-filter-top.component";
import {
  MessageTemplateActiveInactive,
  MessageTemplateActiveInactiveResponse,
  MessageTemplateTurnOnResponse,
  MessageTemplateTurnOnTurnOff,
  SingleMessageTemplate,
} from "./message-template.type";

export const MessageTemplate = () => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [payloadData, setPayloadData] =
    useState<MessageTemplateActiveInactive>();
  const [isTurnOnPopupVisible, setTurnPopupVisible] = useState<boolean>(false);
  const [turnOnPayloadData, setTurnOnPayloadData] =
    useState<MessageTemplateTurnOnTurnOff>();
  const [refetch, toggleRefetch] = useToggle(false);
  const [visible, setVisible] = useToggle(false);
  const [singleMessageTemplate, setSingleMessageTemplate] =
    useState<SingleMessageTemplate | null>(null);

  const {
    trigger,
    data: maxTicketSubmissionSettingIsActiveResponse,
    error,
    isMutating,
  } = useDelete<unknown, MessageTemplateActiveInactiveResponse>(
    `${Api.MessageTemplateDelete}/${
      payloadData?.id
    }?isActive=${!payloadData?.isActive}`
  );
  const {
    trigger: turnOnTrigger,
    data: maxTicketSubmissionSettingIsTurnOnResponse,
    error: maxTicketSubmissionSettingIsTurnOnError,
    isMutating: isMutatingMessageTemplateTurnOn,
  } = usePut<unknown, MessageTemplateTurnOnResponse>(
    `${Api.MessageTemplateUpdate}?id=${turnOnPayloadData?.id}&accountTypeId=${turnOnPayloadData?.accountTypeId}`
  );

  const handleConfirm = async () => {
    setPopupVisible(false);
    await trigger(undefined);
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleActiveInactive = (payload: MessageTemplateActiveInactive) => {
    setPopupVisible(true);
    setPayloadData(payload);
  };

  const handleCreate = () => {
    setSingleMessageTemplate(null);
    setVisible(true);
  };

  const handleEdit = (data: SingleMessageTemplate) => {
    setSingleMessageTemplate(data);
    setVisible(true);
  };

  const columns = MessageTemplateListColumn(handleActiveInactive, handleEdit);

  useEffect(() => {
    if (!isMutating && maxTicketSubmissionSettingIsActiveResponse?.status) {
      toast.success(maxTicketSubmissionSettingIsActiveResponse?.message);
      toggleRefetch(true);
    } else if (
      !isMutating &&
      !maxTicketSubmissionSettingIsActiveResponse?.status
    ) {
      toast.error(error?.message);
    }
  }, [maxTicketSubmissionSettingIsActiveResponse, error]);

  useEffect(() => {
    if (
      !isMutatingMessageTemplateTurnOn &&
      maxTicketSubmissionSettingIsTurnOnResponse?.status
    ) {
      toast.success(maxTicketSubmissionSettingIsTurnOnResponse?.message);
      toggleRefetch(true);
    } else if (
      !isMutatingMessageTemplateTurnOn &&
      !maxTicketSubmissionSettingIsTurnOnResponse?.status
    ) {
      toast.error(maxTicketSubmissionSettingIsTurnOnError?.message);
    }
  }, [
    maxTicketSubmissionSettingIsTurnOnResponse,
    maxTicketSubmissionSettingIsTurnOnError,
  ]);

  function ConfirmModalBody() {
    return (
      <p>
        Are you sure you want to {payloadData?.isActive ? "disable" : "enable"}{" "}
        {payloadData?.name}?
      </p>
    );
  }

  function ConfirmModalTitle() {
    return payloadData?.isActive
      ? "Disable message template"
      : "Enable message template";
  }

  return (
    <CommonLayout
      title="Message template list"
      BtnComp={
        <CreateButton onClick={handleCreate} outlined>
          Create
        </CreateButton>
      }
    >
      <DataTable
        showGridlines
        url={Api.MessageTemplateGetAll}
        columns={columns || []}
        topFilter={MessageTemplateTopFilter}
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

      <MessageTemplateCreate
        show={visible}
        onHide={setVisible}
        info={singleMessageTemplate}
        onDataTableRefetch={toggleRefetch}
      />
    </CommonLayout>
  );
};
