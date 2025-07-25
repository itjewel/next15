import { CommonLayout } from "@/features/layouts";
import {
  CardWrapper,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
  LinkButton,
} from "@/features/ui";
import { DisplayImage } from "@/features/ui/display-image";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form, Formik } from "formik";
import { trim } from "lodash";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateReasonOfSystemOnOffMutation,
  useLazyGetSystemOnOffReasonIdQuery,
  useUpdateReasonOfSystemOnOffMutation,
} from "../system-on-off-api";
import { InitialValues, SchemaOfSystemOnOffReason } from "./form.config";

const breadcrumbItemsCreate = [
  { name: "System On & Off Reason", url: "/system-on-off-reason" },
  {
    name: "System On & Off Reason Create",
    url: "/system-on-off-reason/create",
  },
];

const breadcrumbsItemEdit = [
  { name: "System On & Off Reason", url: "/system-on-off-reason" },
  {
    name: "System On & Off Reason Update",
    url: "/system-on-off-reason/create",
  },
];

export const RebootForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trigger, { data: editRebootSystem }] =
    useLazyGetSystemOnOffReasonIdQuery();

  const [
    createRebootSystem,
    { isSuccess: addSuccess, data: successmsg, error: postError },
  ] = useCreateReasonOfSystemOnOffMutation();
  const [
    updateRebootSystem,
    { isSuccess: editSuccess, data: updatemsg, error: updateError },
  ] = useUpdateReasonOfSystemOnOffMutation();

  const handleSubmit = async (values) => {
    let formData = new FormData();
    formData.append("Name", trim(values.name));
    formData.append("Description", trim(values.description));
    formData.append("image", values.image);

    let params = id ? { id: values.id, formData } : formData;
    id ? await updateRebootSystem(params) : await createRebootSystem(params);
  };

  useEffect(() => {
    id && trigger(id);
  }, [id]);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(
        id
          ? updatemsg?.message || "Updated Successfully"
          : successmsg?.message || "Created Successfully"
      );
      navigate("/system-on-off-reason");
    }
  }, [addSuccess, editSuccess]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={id ? breadcrumbsItemEdit : breadcrumbItemsCreate}
        BtnComp={<LinkButton to="/system-on-off-reason" btnName="Back" />}
        title={
          id ? "Update system on & off reason" : "Create system on & off reason"
        }
      />
      <CardWrapper>
        <Formik
          enableReinitialize
          initialValues={
            id
              ? {
                  id: id,
                  name: editRebootSystem?.data?.name,
                  description: editRebootSystem?.data?.description || "",
                  image: editRebootSystem?.data?.image || "",
                }
              : InitialValues
          }
          validationSchema={SchemaOfSystemOnOffReason}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Row xs={12} className="mb-1">
                <Col lg={6} className="py-2">
                  <FormikInputField
                    name="name"
                    apiError={
                      postError?.data?.data?.name ||
                      updateError?.data?.data?.name
                    }
                    inputFieldProps={{
                      label: "Name",
                      required: true,
                      placeholder: "Enter name",
                    }}
                    onChange={handleChange}
                  />
                </Col>

                <Col lg={6} className="py-2">
                  <FormikTextAria
                    name="description"
                    textAreaProps={{
                      label: "Description",
                      placeholder: lang("description"),
                    }}
                  />
                </Col>
              </Row>
              <Row xs={12} className="mb-1">
                <Col xs={6} className="mb-2">
                  <FormikImageField
                    name="image"
                    imageFieldProps={{
                      label:
                        "Image (Maximum image size: 5mb, Supports:JPG/JPEG/PNG)",
                      accept: ".jpg, .jpeg, .bmp, .png, .webp",
                    }}
                  />
                  {values?.image && (
                    <DisplayImage
                      value={values?.image}
                      fieldName={"image"}
                      id={id}
                    />
                  )}
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </CardWrapper>
    </div>
  );
};
