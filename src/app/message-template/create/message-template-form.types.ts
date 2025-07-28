import * as Yup from "yup";
import { SingleMessageTemplate } from "../message-template.type";
import { MessageTemplateCreateSchema } from "./message-template-create-form.config";

export interface MessageTemplateCreateProps {
  show: boolean;
  onHide: (value: boolean) => void;
  info: SingleMessageTemplate | null;
  onDataTableRefetch: (value: boolean) => void;
}

export type MessageTemplateCreateYup = Yup.InferType<
  typeof MessageTemplateCreateSchema
>;

export type MessageTemplateCreateRequest = {
  name?: string;
  body?: string;
};

export type MessageTemplateCreateResponse = {
  status?: boolean;
  message?: string;
};

export type MessageTemplateCreateFormValues = {
  name?: string;
  body?: string;
};

export type MessageTemplateSingleGetResponse = {
  status: boolean;
  message: string;
  data?: {
    name: string;
    body: string;
    id: number;
    createdAt: string;
    createdBy: number;
    updatedAt: string | null;
    updatedBy: number | null;
    isActive: boolean;
  };
};

interface Option {
  value?: number | string;
  label?: string | undefined;
}

interface PlaceholderType {
  name: string;
  id: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string | null;
  updatedBy: number | null;
  isActive: boolean;
}
