import * as yup from "yup";

export const initialFormValues = {
  branchAvailabilityStatusId: "",
  reason: "",
  type: "",
  city: [],
  zone: [],
  restaurant: [],
  branch: [],
  startDate: "",
  endDate: "",
  description: "",
};

export const ValidationSchema = (isBranchDeactivation) =>
  yup.object({
    reason: yup.string().min(3).max(200).trim().required("Reason is required"),
    type: isBranchDeactivation
      ? yup.string()
      : yup.string().required("Type is required"),
    branchAvailabilityStatusId: isBranchDeactivation
      ? yup.string().required("Branch Availability Status is required")
      : yup.string(),
    city: isBranchDeactivation
      ? yup.array()
      : yup.array().when("type", (type, schema) => {
          if (type == 4 || type == 1 || type == 2) {
            return schema
              .of(
                yup.object().shape({
                  value: yup.string().required(),
                  label: yup.string().required(),
                })
              )
              .min(1, "At least one city is required.")
              .required("City is required");
          }
          return schema;
        }),
    zone: isBranchDeactivation
      ? yup.array()
      : yup.array().when("type", (type, schema) => {
          if (type == 4 || type == 2) {
            return schema
              .of(
                yup.object().shape({
                  value: yup.string().required(),
                  label: yup.string().required(),
                })
              )
              .min(1, "At least one zone is required.")
              .required("Zone is required");
          }
          return schema;
        }),
    restaurant: isBranchDeactivation
      ? yup.array()
      : yup.array().when("type", (type, schema) => {
          if (type == 4 || type == 3) {
            return schema
              .of(
                yup.object().shape({
                  value: yup.string().required(),
                  label: yup.string().required(),
                })
              )
              .min(1, "At least one restaurant is required.")
              .required("Restaurant is required");
          }
          return schema;
        }),
    branch: isBranchDeactivation
      ? yup.array()
      : yup.array().when("type", (type, schema) => {
          if (type == 4) {
            return schema
              .of(
                yup.object().shape({
                  value: yup.string().required(),
                  label: yup.string().required(),
                })
              )
              .min(1, "At least one branch is required.")
              .required("Branch is required");
          }
          return schema;
        }),
    startDate: yup.date().required("Start date-time is required"),
    endDate: yup
      .date()
      .required("End date-time is required")
      .min(yup.ref("startDate"), "End date cannot be before start date.")
      .test(
        "is-greater-than-start",
        "End date-time must be greater than start date-time",
        function (value) {
          const startDate = this.resolve(yup.ref("startDate"));
          return !startDate || !value || startDate < value;
        }
      )
      .test(
        "is-greater-than-current",
        "End date-time must be greater than current date-time",
        function (value) {
          const currentDate = new Date();
          return !value || currentDate < value;
        }
      ),
  });
