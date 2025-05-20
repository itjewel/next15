import { Api, usePost, usePut } from "features/api";
import { FormDialog } from "features/ui";
import { FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MessageTemplateCreateForm } from "./message-template-create-form.component";
import {
  GetMessageTemplateValues,
  MessageTemplateCreateSchema,
  MessageTemplateInitialValues,
  generatePayload,
} from "./message-template-create-form.config";
import {
  MessageTemplateCreateProps,
  MessageTemplateCreateRequest,
  MessageTemplateCreateResponse,
} from "./message-template-form.types";

export const MessageTemplateCreate = ({
  show,
  onHide,
  info,
  onDataTableRefetch,
}: MessageTemplateCreateProps) => {
  const {
    trigger,
    data: messageTemplateCreateResponse,
    error,
    isMutating,
  } = usePost<MessageTemplateCreateRequest, MessageTemplateCreateResponse>(
    Api.MessageTemplateCreate
  );

  const {
    trigger: messageTemplateUpdateTrigger,
    data: messageTemplateUpdateResponse,
    error: messageTemplateUpdateError,
    isMutating: isMutatingMessageTemplateUpdate,
  } = usePut<MessageTemplateCreateRequest, MessageTemplateCreateResponse>(
    `${Api.MessageTemplateUpdate}/${info?.id}`
  );

  const formik = useFormik({
    initialValues: info?.id
      ? GetMessageTemplateValues(info)
      : MessageTemplateInitialValues,
    validationSchema: MessageTemplateCreateSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const payload = generatePayload(values);
      if (info?.id) {
        await messageTemplateUpdateTrigger(payload);
      } else {
        await trigger(payload);
      }
    },
  });

  useEffect(() => {
    if (messageTemplateCreateResponse?.status) {
      toast.success(messageTemplateCreateResponse?.message);
      onHide(false);
      onDataTableRefetch(true);
      formik?.resetForm();
    }
  }, [messageTemplateCreateResponse]);
  useEffect(() => {
    if (messageTemplateUpdateResponse?.status) {
      toast.success(messageTemplateUpdateResponse?.message);
      onHide(false);
      onDataTableRefetch(true);
      formik?.resetForm();
    }
  }, [messageTemplateUpdateResponse]);

  useEffect(() => {
    if (!error?.status) {
      toast.error(error?.message);
    }
  }, [error]);
  useEffect(() => {
    if (!messageTemplateUpdateError?.status) {
      toast.error(messageTemplateUpdateError?.message);
    }
  }, [messageTemplateUpdateError]);

  return (
    <FormDialog
      title={`Message Template ${info ? "update" : "create"}`}
      visible={show}
      onHide={() => onHide(false)}
      body={
        <FormikProvider value={formik}>
          <MessageTemplateCreateForm />
        </FormikProvider>
      }
    />
  );
};
