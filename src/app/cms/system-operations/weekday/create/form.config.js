import * as yup from "yup";

export const InitialValues = {
  name: "",
};

export const WeekdaySchema = yup.object({
  name: yup.string().min(1).max(100).trim().required("Name Is Required"),
});
