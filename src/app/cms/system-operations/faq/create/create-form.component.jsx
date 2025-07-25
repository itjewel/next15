import {
  CardWrapper,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  TextEditor,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { FieldArray, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FaqCreateSchema, faqLang, initialValue } from "./form.config";

import { Api } from "@/constants";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateFaqMutation,
  useEditFaqMutation,
  useGetFAQTypeOptionsQuery,
  useLazyGetFaqByIdQuery,
} from "../faq-api";

export const FaqCreateForm = ({ id }) => {
  const languageOptions = [
    { label: "Bangla", value: 1 },
    { label: "English", value: 2 },
    { label: "Hindi", value: 3 },
    { label: "Urdu", value: 4 },
  ];

  const userTypeOptions = [
    { label: "Rider", value: "Rider" },
    { label: "CMS", value: "CMS" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Customer", value: "Customer" },
    { label: "CRM", value: "CRM" },
  ];

  const [deletedId, setDeletedId] = useState([]);
  const [trigger, { data: faqData, isFetching: dataFetching }] =
    useLazyGetFaqByIdQuery();
  const [
    editItem,
    { data: putResponse, isSuccess: putSuccess, error: updateError },
  ] = useEditFaqMutation();
  const [
    addItem,
    { data: postResponse, isSuccess: postSuccess, error: postError },
  ] = useCreateFaqMutation();
  const { pageNumber, itemsPerPage, isActive, sortBy, sortOrder } = useSelector(
    (state) => state.commonTable
  );
  const { data: faqTypeOptions, isFetching: faqFetch } =
    useGetFAQTypeOptionsQuery();
  const [getList] = useLazyGetTableListQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  const handleSubmission = async (values) => {
    const question = values?.faqLangs[0].question.trim();
    const answer = values?.faqLangs[0].answer.trim();
    (values.question = question),
      (values.answer = answer),
      (values.deletedFaqLangIds = deletedId),
      id ? await editItem(values) : await addItem(values);
  };

  useEffect(() => {
    if (postResponse && postSuccess) {
      toast.success(postResponse?.message);
      getList({
        url: Api.GetFaqLists,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      navigate("/faq");
    }
  }, [postResponse]);

  useEffect(() => {
    if (putResponse && putSuccess) {
      toast.success(putResponse?.message);
      getList({
        url: Api.GetFaqLists,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
          sortBy,
          sortOrder,
        },
      });
      navigate("/faq");
    }
  }, [putResponse]);

  return (
    <div>
      <CardWrapper>
        {!dataFetching && !faqFetch ? (
          <Formik
            enableReinitialize
            initialValues={
              id
                ? {
                    id: id,
                    userTypeId: faqData?.data?.userTypeId,
                    faqTypeId: faqData?.data?.faqTypeId,
                    faqLangs: faqData?.data?.faqLangs,
                  }
                : initialValue
            }
            validationSchema={FaqCreateSchema}
            onSubmit={async (values) => {
              await handleSubmission(values);
            }}
          >
            {({ values, setFieldValue, errors }) => (
              <>
                <Form className="vstack gap-3">
                  <Row>
                    <Col sm={12} md={6}>
                      <FormikSelectField
                        name="userTypeId"
                        selectFieldProps={{
                          label: "User type",
                          placeholder: "Select user type",
                          required: true,
                          options: userTypeOptions,
                        }}
                      />
                    </Col>

                    <Col sm={12} md={6}>
                      <FormikSelectField
                        name="faqTypeId"
                        apiError={
                          postError?.data?.data?.faq ||
                          updateError?.data?.data?.faq
                        }
                        selectFieldProps={{
                          label: "FAQ type",
                          placeholder: "Select faq type",
                          required: true,
                          options: faqTypeOptions?.items,
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={12} className="mb-1">
                      <FieldArray
                        name="faqLangs"
                        render={(arrayHelpers) => (
                          <div>
                            {values?.faqLangs?.map((item, index) => (
                              <div key={index} className="card p-4 mb-3">
                                <Row className="mb-3">
                                  <Col sm={12} md={6} className="mb-1 asass">
                                    <FormikSelectField
                                      name={`faqLangs[${index}].languageId`}
                                      selectFieldProps={{
                                        label: "Language",
                                        required: true,
                                        options: languageOptions,
                                      }}
                                    />
                                  </Col>
                                  <Col sm={12} md={6} className="mb-1">
                                    <FormikInputField
                                      name={`faqLangs[${index}].question`}
                                      inputFieldProps={{
                                        label: "Question",
                                        required: true,
                                        placeholder: "Enter question",
                                      }}
                                    />
                                  </Col>
                                </Row>
                                <Row className="vstack gap-2">
                                  <Col xs={12}>
                                    <label className="col-md-2 col-form-label fw-medium">
                                      Answer
                                      <span className="text-danger">*</span>
                                    </label>
                                  </Col>
                                  <Col xs={12} className="mb-1">
                                    <TextEditor
                                      label="Answer"
                                      value={values.faqLangs[index]?.answer}
                                      onEditorChange={(newValue) => {
                                        setFieldValue(
                                          `faqLangs[${index}].answer`,
                                          newValue
                                        );
                                      }}
                                    />
                                    {errors &&
                                    values.faqLangs[index]?.answer == "" ? (
                                      <p className="text-danger">
                                        Faq answer is required
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </Col>
                                  <Col
                                    xs={12}
                                    className="mt-4 pt-1 d-flex justify-content-end mb-2"
                                  >
                                    {values?.faqLangs?.length > 1 && (
                                      <Button
                                        className="me-2"
                                        variant="outline-secondary"
                                        onClick={() => {
                                          id
                                            ? setDeletedId([
                                                ...deletedId,
                                                values.faqLangs[index]?.id,
                                              ])
                                            : "",
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
                                      variant="outline-primary"
                                      onClick={() => arrayHelpers.push(faqLang)}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FiPlus />
                                        <span style={{ marginLeft: "4px" }}>
                                          Add
                                        </span>
                                      </div>
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <FormikSubmitButton>Submit</FormikSubmitButton>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        ) : (
          ""
        )}
      </CardWrapper>
    </div>
  );
};
