import moment from "moment";
import * as Yup from "yup";

export const operation = {
  id: 0,
  platformOperationTimeSlotId: 0,
  zoneId: "",
};

export const initailValue = {
  weekDay: "",
  startTime: "",
  endTime: "",
  operationsDetails: [operation],
  platformOperationDetailIds: [],
};

export const TimeSlotValidationSchema = Yup.object().shape({
  weekDay: Yup.number().required("Weekday is required field"),
  startTime: Yup.string().required("Start time is required field"),
  endTime: Yup.string()
    .required("End time is required field")
    .test(
      "isGreater",
      "End time Should be later than start time",
      function (value) {
        const { startTime } = this.parent;
        return moment(value, "HH:mm").isAfter(moment(startTime, "HH:mm"));
      }
    ),
  operationsDetails: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      platformOperationTimeSlotId: Yup.number(),
      zoneId: Yup.object().required("Zoneid is required field"),
    })
  ),
  platformOperationDetailIds: Yup.array().of(Yup.number()),
});
