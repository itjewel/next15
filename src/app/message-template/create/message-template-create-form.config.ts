import { cloneDeep } from "lodash";
import * as Yup from "yup";
import { SingleMessageTemplate } from "../message-template.type";
import {
  MessageTemplateCreateFormValues,
  MessageTemplateCreateRequest,
} from "./message-template-form.types";

export const MessageTemplateInitialValues: MessageTemplateCreateFormValues = {
  name: "",
  body: "",
};

const isHtmlEmpty = (html: string) => {
  // Remove HTML tags and check if remaining text is empty
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length === 0;
};

export const MessageTemplateCreateSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(0)
    .max(100, "Name must be less than 100 characters")
    .label("Name")
    .required(),
  body: Yup.string()
    .label("Body")
    .required("Body is required")
    .test("not-empty-html", "Body cannot be empty", (value) => {
      if (!value) return false;
      return !isHtmlEmpty(value);
    }),
});

export const GetMessageTemplateValues = (
  values: SingleMessageTemplate | null
) => {
  const initialValues = cloneDeep(values);

  const formattedValues: MessageTemplateCreateFormValues = {
    name: initialValues?.name ?? "",
    body: initialValues?.body ?? "",
  };
  return formattedValues;
};

export const generatePayload = (values: MessageTemplateCreateFormValues) => {
  const formValues = cloneDeep(values);
  const formattedFormValues: MessageTemplateCreateRequest = {
    name: formValues.name,
    body: formValues.body,
  };

  return formattedFormValues;
};
