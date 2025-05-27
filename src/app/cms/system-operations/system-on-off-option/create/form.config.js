import * as yup from "yup";

export const initialValues = {
  name: "",
  isSystemOff: true,
  systemOnOffReasonId: "",
  systemOptionDetails: [
    {
      id: 0,
      zoneId: "",
      systemOptionId: 0,
    },
  ],
  deletedSystemOptionDetailIds: [],
};

export const systemOptionSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  isSystemOff: yup.boolean(),
  systemOnOffReasonId: yup.object().required("Reason is required"),
  deletedSystemOptionDetailIds: yup.array().of(yup.number()),
  systemOptionDetails: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      zoneId: yup.object().required("Zone is required"),
      systemOptionId: yup.number(),
    })
  ),
});
