import * as yup from "yup";

export const InitialValues = {
  name: "",
  description: "",
  image: "",
};

export const SchemaOfSystemOnOffReason = yup.object({
  name: yup
    .string()
    .trim()
    .min(1, "Name should have miminum one character")
    .max(100)
    .trim()
    .required("Name is required field"),
  description: yup.string().trim().optional(),
  image: yup
    .mixed()
    .test("fileSize", "Logo can not be larger than 5MB", (file) => {
      if (file && typeof file == "object") {
        return file.size <= 5 * 1024 * 1024;
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
