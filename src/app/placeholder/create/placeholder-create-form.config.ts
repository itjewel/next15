import { cloneDeep } from "lodash";
import * as Yup from "yup";
import { SinglePlaceholder } from "../placeholder.type";
import {
  PlaceholderCreateFormValues,
  PlaceholderCreateRequest,
} from "./placeholder-form.types";

export const PlaceholderInitialValues: PlaceholderCreateFormValues = {
  name: "",
  description: "",
  actionType: { value: "", label: "" },
  action: "",
  sampleText: "",
};

const isHtmlEmpty = (html: string) => {
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length === 0;
};

export const PlaceholderCreateSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .max(100, "Name must be less than 100 characters")
    .required("Name is required")
    .label("Name"),

  description: Yup.string()
    .trim()
    .max(5000, "Description must be less than 5000 characters")
    .required("Description is required")
    .label("Description"),

  actionType: Yup.object()
    .shape({
      label: Yup.string().required("Action type label is required"),
      value: Yup.string().required("Action type value is required"),
    })
    .required("Action type is required")
    .label("Action type"),
  action: Yup.string()
    .label("Action")
    .required("Action is required")
    .test("not-empty-html", "Action cannot be empty", (value) => {
      if (!value) return false;
      return !isHtmlEmpty(value);
    }),
  // action: Yup.string().trim().label("Action"),

  sampleText: Yup.string().trim().label("Sample Text"),
});

export const GetPlaceholderValues = (
  values: SinglePlaceholder | null
): PlaceholderCreateFormValues => {
  const initialValues = cloneDeep(values);

  const formattedValues: PlaceholderCreateFormValues = {
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    actionType: {
      value: initialValues?.actionType || "",
      label: initialValues?.actionTypeName || "",
    },
    action: initialValues?.action || "",
    sampleText: initialValues?.sampleText || "",
  };

  return formattedValues;
};

export const generatePayload = (
  values: PlaceholderCreateFormValues
): PlaceholderCreateRequest => {
  const formValues = cloneDeep(values);

  const formattedFormValues: PlaceholderCreateRequest = {
    name: formValues.name,
    description: formValues.description,
    actionType: formValues.actionType?.value || "",
    action: formValues.action || "",
    sampleText: formValues.sampleText || "",
  };

  return formattedFormValues;
};
