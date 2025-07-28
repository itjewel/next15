import * as yup from "yup";

export const InitialValues = {
  Title: "",
  Description: "",
  Image: "",
  IsVideo: false,
  TimeDurationInSeconds: 0,
};

export const SchemaOfAdvertisement = yup.object({
  Title: yup.string().min(1).max(100).trim().required("Title is required"),
  TimeDurationInSeconds: yup.number().required("Time Duration is required"),
  Description: yup
    .string()
    .trim()
    .min(1, "Minimum one character is required")
    .max(100)
    .trim()
    .required("Description is required"),
  IsVideo: yup.boolean(),
  // Image: yup
  //   .mixed()
  //   .test("fileSize", "Image size must be less than 5MB", (value) => {
  //     if (!value) return true;
  //     return value.size <= 5 * 1024 * 1024;
  //   })
  //   .required("Image Is required"),
  Image: yup
    .mixed()
    .test("fileTypeAndSize", "Invalid file type or size", function (value) {
      const { IsVideo } = this.parent;

      if (!value) return !IsVideo;

      const allowedVideoExtensions = [".mp4", ".m4p", ".m4v", ".flv", ".f4v"];
      const allowedImageExtensions = [
        ".jpg",
        ".jpeg",
        ".bmp",
        ".png",
        ".webp",
        ".gif",
      ];

      if (IsVideo && typeof value != "string") {
        // Video validation
        return (
          value.type.startsWith("video/") &&
          allowedVideoExtensions.includes(
            `.${value.name.split(".").pop().toLowerCase()}`
          ) &&
          value.size <= 10 * 1024 * 1024
        );
      } else if (!IsVideo && typeof value != "string") {
        // Image validation
        return (
          value.type.startsWith("image/") &&
          allowedImageExtensions.includes(
            `.${value.name.split(".").pop().toLowerCase()}`
          ) &&
          value.size <= 3 * 1024 * 1024
        );
      } else if (typeof value == "string") {
        return true;
      }
    })
    .required("Image is required"),
});
