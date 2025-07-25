import * as yup from "yup";

export const InitialValues = {
  Title: "",
  Description: "",
  File: "",
  Url: "",
};

export const RestaurantTutorialSchema = yup.object({
  Title: yup.string().min(1).trim().required("Title is required"),
  Description: yup.string().max(100).trim().nullable(),
  Url: yup.string().url("Please enter a valid url"),
  File: yup
    .mixed()
    .test("fileSize", "Image can not be larger than 3MB", (file) => {
      if (file && typeof file == "object") {
        return file.size <= 3 * 1024 * 1024;
      } else {
        return true;
      }
    })
    .test("fileType", "We support JPG JPEG  and PNG images", (value) => {
      if (typeof value == "object") {
        return (
          value.type === "image/jpeg" ||
          value.type === "image/png" ||
          value.type === "image/jpg"
        );
      } else {
        return true;
      }
    }),
});
