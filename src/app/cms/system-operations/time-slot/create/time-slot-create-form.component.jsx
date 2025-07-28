import { Api } from "@/constants";
import { useGetAllWeekDaysQuery, useGetAllZonesQuery } from "@/features/api";
import {
  CardWrapper,
  FormikAutoComplete,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddTimeSlotMutation,
  useLazyGetTimeSlotByIdQuery,
  useUpdateTimeSlotMutation,
} from "../time-slot-api";
import {
  TimeSlotValidationSchema,
  initailValue,
  operation,
} from "./form.config";

export const TimeSlotForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [deletedId, setDeletedId] = useState([]);
  const { data: zoneOptions } = useGetAllZonesQuery();
  const { data: weekDayOptions } = useGetAllWeekDaysQuery();
  const [
    addTimeSlot,
    { data: postData, isSuccess: postSuccess, error: postError },
  ] = useAddTimeSlotMutation();
  const [
    editTimeSlot,
    { data: puttData, isSuccess: puttSuccess, error: updateError },
  ] = useUpdateTimeSlotMutation();
  const [trigger, { data: timeSlot, isFetching }] =
    useLazyGetTimeSlotByIdQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );
  const [getList] = useLazyGetTableListQuery();

  useEffect(() => {
    if (params.id) {
      trigger(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (values) => {
    const ids = values?.operationsDetails?.map((item) => item?.id);
    let newValues = {
      ...values,
      startTime:
        values.startTime.length == 8
          ? values.startTime
          : values.startTime + ":00",
      endTime:
        values.endTime.length == 8 ? values.endTime : values.endTime + ":00",
      weekDay: parseInt(values.weekDay),
      operationsDetails: values?.operationsDetails?.map((item) => {
        return {
          id: item?.id,
          platformOperationTimeSlotId: item?.platformOperationTimeSlotId,
          zoneId: item?.zoneId?.value,
        };
      }),
    };
    console.log({ ...newValues, platformOperationDetailIds: deletedId });
    params?.id
      ? await editTimeSlot({
          ...newValues,
          platformOperationDetailIds: deletedId,
        })
      : await addTimeSlot(newValues);
  };

  useEffect(() => {
    if (postData && postSuccess) {
      toast.success(postData?.message);
      getList({
        url: Api.GetPlatformTimeSlot,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      navigate("/system-operation-time-slot");
    }
  }, [postData]);

  useEffect(() => {
    if (puttData && puttSuccess) {
      toast.success(puttData?.message);
      getList({
        url: Api.GetPlatformTimeSlot,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      navigate("/system-operation-time-slot");
    }
  }, [puttData]);

  return (
    <CardWrapper>
      {isFetching ? (
        ""
      ) : (
        <Formik
          enableReinitialize
          initialValues={
            params?.id
              ? {
                  id: params.id,
                  weekDay: timeSlot?.data?.weekDay,
                  startTime: timeSlot?.data?.startTime,
                  endTime: timeSlot?.data?.endTime,
                  operationsDetails: timeSlot?.data?.operations?.map((item) => {
                    return {
                      id: item.id,
                      platformOperationTimeSlotId:
                        item?.platformOperationTimeSlotId,
                      zoneId: { value: item?.zoneId, label: item?.zoneName },
                    };
                  }),
                }
              : initailValue
          }
          validationSchema={TimeSlotValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form className="vstack gap-2">
              <Row>
                <Col>
                  <FormikSelectField
                    name="weekDay"
                    apiError={
                      postError?.data?.data?.weekDay ||
                      updateError?.data?.data?.weekDay
                    }
                    selectFieldProps={{
                      label: "Weekday",
                      options: weekDayOptions?.items,
                      required: true,
                    }}
                  />
                </Col>
                <Col>
                  <FormikInputField
                    name="startTime"
                    apiError={
                      postError?.data?.data?.startTime ||
                      updateError?.data?.data?.startTime
                    }
                    inputFieldProps={{
                      label: "Start time",
                      placeholder: "Enter Start Time",
                      type: "time",
                      required: true,
                    }}
                    value={values.startTime}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <FormikInputField
                    name="endTime"
                    apiError={
                      postError?.data?.data?.endTime ||
                      updateError?.data?.data?.endTime
                    }
                    inputFieldProps={{
                      label: "End time",
                      placeholder: "Enter End Time",
                      type: "time",
                      required: true,
                    }}
                    value={values.endTime}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <FieldArray
                  name="operationsDetails"
                  render={(arrayHelpers) => (
                    <div>
                      {values?.operationsDetails?.map((item, index) => (
                        <Row key={index}>
                          <Col className="mb-2">
                            <FormikAutoComplete
                              name={`operationsDetails[${index}].zoneId`}
                              apiError={
                                postError?.data?.data?.operationTimeSlotInDto ||
                                updateError?.data?.data?.operationTimeSlotInDto
                              }
                              autoCompleteProps={{
                                label: "Zone",
                                options: zoneOptions?.items,
                                required: true,
                              }}
                            />
                          </Col>

                          <Col className="mt-4 pt-1">
                            {values?.operationsDetails?.length > 1 && (
                              <Button
                                variant="outline-secondary"
                                onClick={() => {
                                  setDeletedId([...deletedId, item.id]);
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <MdDelete />
                                  <span style={{ marginLeft: "4px" }}>
                                    Delete
                                  </span>
                                </div>
                              </Button>
                            )}
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="outline-primary"
                        onClick={() => arrayHelpers.push(operation)}
                      >
                        <FiPlus />
                        <span>Add</span>
                      </Button>
                    </div>
                  )}
                />
              </Row>
              <div className="d-flex justify-content-end mt-4 mb-1">
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </CardWrapper>
  );
};
