import * as yup from "yup";

export const InitialValues = {
  name: "",
  description: "",
};

export const specialHourTypeSchema = yup.object({
  name: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("Special hour type is required"),
  description: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("Description is required"),
});
