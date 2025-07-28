import * as yup from "yup";

export const InitialValues = {
  title: "",
  videoURL: "",
};

export const RiderTutorialSchema = yup.object({
  title: yup.string().min(1).trim().required("Title is required"),
  videoURL: yup.string().url("Please enter a valid url"),
});
