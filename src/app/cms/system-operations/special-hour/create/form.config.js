import { yupToFormErrors } from "formik";
import moment from "moment";
import * as Yup from "yup";
export const initialValue = {
  specialHourTypeId: {
    label: "",
    value: "",
  },
  startTime: "",
  endTime: "",
};

export const SpecialHourCreateSchema = Yup.object().shape({
  specialHourTypeId: Yup.object({
    label: Yup.string().required().label("Special hour"),
    value: Yup.string().required().label("Special hour"),
  })
    .required()
    .label("Special hour"),
  startTime: Yup.string().required("Specail start time is required field"),
  endTime: Yup.string()
    .required("Specail end time is required field")
    .test("isGreater", "End time should be after start time", function (value) {
      const { startTime } = this.parent;
      return moment(value, "HH:mm").isAfter(moment(startTime, "HH:mm"));
    }),
});
