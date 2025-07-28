import * as Yup from "yup";
import { SinglePlaceholder } from "../placeholder.type";
import { PlaceholderCreateSchema } from "./placeholder-create-form.config";

export interface PlaceholderCreateProps {
  show: boolean;
  onHide: (value: boolean) => void;
  info: SinglePlaceholder | null;
  onDataTableRefetch: (value: boolean) => void;
}

export type PlaceholderCreateYup = Yup.InferType<
  typeof PlaceholderCreateSchema
>;

export type PlaceholderCreateRequest = {
  name?: string;
  description?: string;
  actionType?: string | number;
  action?: string;
  sampleText?: string;
};

export type PlaceholderCreateResponse = {
  status?: boolean;
  message?: string;
};

export type PlaceholderCreateFormValues = {
  name?: string;
  description?: string;
  actionType?: Option;
  action?: string;
  sampleText?: string;
  actionTypeName?: string;
};

export type PlaceholderSingleGetResponse = {
  status: boolean;
  message: string;
  data?: {
    name: string;
    description: string;
    actionType: ActionType;
    action: string;
    sampleText: string;
    id: number;
    createdAt: string;
    createdBy: number;
    updatedAt: string | null;
    updatedBy: number | null;
    isActive: boolean;
  };
};

interface Option {
  value?: number | string | undefined;
  label?: string | undefined;
}

interface ActionType {
  name: string;
  id: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string | null;
  updatedBy: number | null;
  // isActive: boolean;
}
