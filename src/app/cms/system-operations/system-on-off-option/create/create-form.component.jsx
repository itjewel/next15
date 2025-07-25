import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllZonesQuery } from "../../../api/common-api-hooks";
import { CommonLayout } from "../../../layouts";
import {
  CardWrapper,
  FormikAutoComplete,
  FormikCheckBox,
  FormikInputField,
  FormikSubmitButton,
  LinkButton,
} from "../../../ui";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import {
  useAddSystemOptionMutation,
  useEditSystemOptionMutation,
  useGetsystemonoffreasonQuery,
  useLazyGetSystemOptionByIdQuery,
} from "../system-on-off-option-api";
import { initialValues, systemOptionSchema } from "./form.config";

export const SystemOnOffOptionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [deleteZones, setDeleteZones] = useState([]);

  const { data: zones } = useGetAllZonesQuery();
  const { data: rebootreason } = useGetsystemonoffreasonQuery();

  const [
    addSytemOption,
    { data: postData, isSuccess: addSuccess, isError: addError, error },
  ] = useAddSystemOptionMutation();

  const [
    editSytemOption,
    { data: putData, isSuccess: editSuccess, isError: editError, errorID },
  ] = useEditSystemOptionMutation();

  const [trigger, { data: editData }] = useLazyGetSystemOptionByIdQuery();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );

  const handleSubmit = async (values) => {
    (values.deletedSystemOptionDetailIds = deleteZones),
      (values.systemOnOffReasonId = values?.systemOnOffReasonId?.value);
    values.systemOptionDetails = values.systemOptionDetails.map((item) => {
      return {
        id: item.id,
        zoneId: item?.zoneId?.value,
        systemOptionId: item?.systemOptionId,
      };
    });
    values.id ? await editSytemOption(values) : await addSytemOption(values);
  };

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  useEffect(() => {
    if (postData && addSuccess) {
      toast.success(postData?.message);
      getList({
        url: "/system-operations/api/SystemOnOffOption",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      navigate("/system-on-off-option");
    }

    if (addError) {
      toast.error(error?.data?.message);
    }
  }, [postData, addSuccess, addError]);

  useEffect(() => {
    if (putData && editSuccess) {
      toast.success(putData?.message);
      getList({
        url: "/system-operations/api/SystemOnOffOption",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      navigate("/system-on-off-option");
    }
    if (editError) {
      toast.error(errorID?.data?.message);
    }
  }, [putData, editSuccess, editError]);

  return (
    <div>
      <CommonLayout
        title={
          id ? "Update system on & off option" : "Create system on & off option"
        }
        BtnComp={<LinkButton btnName="Back" to="/system-on-off-option" />}
      />
      <CardWrapper>
        <Formik
          enableReinitialize
          initialValues={
            id
              ? {
                  id,
                  name: editData?.data?.name,
                  isSystemOff: editData?.data?.isSystemOff,
                  systemOnOffReasonId: {
                    value: editData?.data?.systemOnOffReasonId,
                    label: editData?.data?.systemOnOffReason.name,
                  },
                  systemOptionDetails: editData?.data?.systemOptionDetails.map(
                    (item) => {
                      return {
                        id: item.id,
                        zoneId: {
                          label: item?.zone?.name,
                          value: item?.zoneId,
                        },
                        systemOptionId: item.systemOptionId,
                      };
                    }
                  ),
                }
              : initialValues
          }
          validationSchema={systemOptionSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Row className="d-flex">
                <Col md={6} xs={12} className="mb-2">
                  <FormikInputField
                    name="name"
                    inputFieldProps={{
                      label: "Name",
                      type: "text",
                      placeholder: "Name",
                      required: true,
                    }}
                  />
                </Col>
                <Col xs={12} md={6} className="mb-2">
                  <FormikAutoComplete
                    name="systemOnOffReasonId"
                    autoCompleteProps={{
                      label: "System on & off reason",
                      options: rebootreason?.items,
                      required: true,
                    }}
                  />
                </Col>

                <Col xs={12} md={6} className="mb-1">
                  <FormikCheckBox
                    name="isSystemOff"
                    checkBoxProps={{
                      label: "System off",
                    }}
                  />
                </Col>
              </Row>
              <Row className="d-flex">
                <Col xs={12} md={12} className="mb-3">
                  <FieldArray
                    name="systemOptionDetails"
                    render={(arrayHelpers) => (
                      <div>
                        {values?.systemOptionDetails?.map((item, index) => (
                          <Row key={index}>
                            <Col className="mb-4">
                              <FormikAutoComplete
                                name={`systemOptionDetails[${index}].zoneId`}
                                autoCompleteProps={{
                                  label: "Zone",
                                  options: zones?.items,
                                  maxMenuHeight: 200,
                                }}
                              />
                            </Col>
                            <Col className="mt-4 mb-4 pt-1 d-flex justify-content-start gap-2 h-auto">
                              {values?.systemOptionDetails.length > 1 && (
                                <Button
                                  className="me-2"
                                  variant="outline-secondary"
                                  onClick={() => {
                                    setDeleteZones((prev) => [
                                      ...prev,
                                      values.systemOptionDetails[index]?.id,
                                    ]),
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
                              <Button
                                className="me-2"
                                variant="outline-primary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    id: 0,
                                    zoneId: parseInt(
                                      `systemOptionDetails[${index}].zoneId`
                                    ),
                                    systemOptionId: 0,
                                  })
                                }
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <FiPlus />
                                  <span style={{ marginLeft: "4px" }}>Add</span>
                                </div>
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </CardWrapper>
    </div>
  );
};
