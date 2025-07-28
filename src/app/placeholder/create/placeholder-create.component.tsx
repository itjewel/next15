import { Api, usePost, usePut } from "features/api";
import { FormDialog } from "features/ui";
import { FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { PlaceholderCreateForm } from "./placeholder-create-form.component";
import {
  GetPlaceholderValues,
  PlaceholderCreateSchema,
  PlaceholderInitialValues,
  generatePayload,
} from "./placeholder-create-form.config";
import {
  PlaceholderCreateProps,
  PlaceholderCreateRequest,
  PlaceholderCreateResponse,
} from "./placeholder-form.types";

export const PlaceholderCreate = ({
  show,
  onHide,
  info,
  onDataTableRefetch,
}: PlaceholderCreateProps) => {
  const {
    trigger,
    data: placeholderCreateResponse,
    error,
    isMutating,
  } = usePost<PlaceholderCreateRequest, PlaceholderCreateResponse>(
    Api.PlaceholderCreate
  );
  const {
    trigger: placeholderUpdateTrigger,
    data: placeholderUpdateResponse,
    error: placeholderUpdateError,
    isMutating: isMutatingPlaceholderUpdate,
  } = usePut<PlaceholderCreateRequest, PlaceholderCreateResponse>(
    `${Api.PlaceholderUpdate}/${info?.id}`
  );

  const formik = useFormik({
    initialValues: info?.id
      ? GetPlaceholderValues(info)
      : PlaceholderInitialValues,
    validationSchema: PlaceholderCreateSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const payload = generatePayload(values);
      if (info?.id) {
        await placeholderUpdateTrigger(payload);
      } else {
        await trigger(payload);
      }
    },
  });

  useEffect(() => {
    if (placeholderCreateResponse?.status) {
      toast.success(placeholderCreateResponse?.message);
      onHide(false);
      onDataTableRefetch(true);
      formik?.resetForm();
    }
  }, [placeholderCreateResponse]);
  useEffect(() => {
    if (placeholderUpdateResponse?.status) {
      toast.success(placeholderUpdateResponse?.message);
      onHide(false);
      onDataTableRefetch(true);
      formik?.resetForm();
    }
  }, [placeholderUpdateResponse]);

  useEffect(() => {
    if (!error?.status) {
      toast.error(error?.message);
    }
  }, [error]);
  useEffect(() => {
    if (!placeholderUpdateError?.status) {
      toast.error(placeholderUpdateError?.message);
    }
  }, [placeholderUpdateError]);

  return (
    <FormDialog
      title={`Placeholder ${info ? "update" : "create"}`}
      visible={show}
      onHide={() => onHide(false)}
      body={
        <FormikProvider value={formik}>
          <PlaceholderCreateForm />
        </FormikProvider>
      }
    />
  );
};
