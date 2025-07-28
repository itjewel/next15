import { CommonLayout } from "@/features/layouts";
import {
  CardWrapper,
  FormikCheckBox,
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
  LinkButton,
} from "@/features/ui";
import { DisplayImage } from "@/features/ui/display-image";
import { DisplayVideo } from "@/features/ui/display-video";
import { Form, Formik } from "formik";
import { trim } from "lodash";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateNewAdvertisementMutation,
  useLazyGetIdAvertisementQuery,
  useUpdateAdvertisementByIdMutation,
} from "../advertisement-apislice";
import { InitialValues, SchemaOfAdvertisement } from "./form.config";

const breadcrumbItemsCreate = [
  { name: "Advertisement", url: "/advertisement" },
  {
    name: "Advertisement create",
    url: "/advertisement/create",
  },
];

const breadcrumbsItemEdit = [
  { name: "Advertisement", url: "/advertisement" },
  {
    name: "Advertisement update",
    url: "/Advertisement/update",
  },
];

export const AdvertisementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trigger, { data: editAdvertimentList }] =
    useLazyGetIdAvertisementQuery();

  const [
    createAdvertisementList,
    { isSuccess: successResult, data: successmsg, error: Posterror },
  ] = useCreateNewAdvertisementMutation();
  const [
    updateAdvertisementList,
    { isSuccess: resultId, data: updatemsg, error: puterror },
  ] = useUpdateAdvertisementByIdMutation();

  const handleSubmit = async (values) => {
    let formData = new FormData();
    formData.append("Title", trim(values.Title));
    formData.append(
      "TimeDurationInSeconds",
      trim(values.TimeDurationInSeconds)
    );
    formData.append("Description", trim(values.Description));
    formData.append(
      "Image",
      typeof values.Image == "string" ? null : values.Image
    );
    formData.append("IsVideo", values?.IsVideo);

    let params = id ? { id: values.id, formData } : formData;
    id
      ? await updateAdvertisementList(params)
      : await createAdvertisementList(params);
  };

  useEffect(() => {
    trigger(id);
  }, [id]);

  useEffect(() => {
    if (successResult || resultId) {
      toast.success(
        id
          ? updatemsg?.message || "Updated successfully"
          : successmsg?.message || "Created successfully"
      );
      navigate("/advertisement");
    }
  }, [successResult, resultId]);

  useEffect(() => {
    toast.error(Posterror?.data?.message);
  }, [Posterror]);

  useEffect(() => {
    if (puterror) {
      toast.error(puterror?.data?.message);
    }
  }, [puterror]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={id ? breadcrumbsItemEdit : breadcrumbItemsCreate}
        BtnComp={<LinkButton to="/advertisement" btnName="Back" />}
        title={id ? "Update advertisement" : "Create advertisement"}
      />
      <CardWrapper>
        <Formik
          enableReinitialize
          initialValues={
            id
              ? {
                  id,
                  Title: editAdvertimentList?.data?.title,
                  Description: editAdvertimentList?.data?.description,
                  Image: editAdvertimentList?.data?.image,
                  IsVideo: editAdvertimentList?.data?.isVideo,
                  TimeDurationInSeconds:
                    editAdvertimentList?.data?.timeDurationInSeconds,
                }
              : InitialValues
          }
          validationSchema={SchemaOfAdvertisement}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Row className="mb-1">
                <Col className="py-2">
                  <FormikInputField
                    name="Title"
                    apiError={
                      Posterror?.data?.data?.title ||
                      puterror?.data?.data?.title
                    }
                    inputFieldProps={{
                      label: "Title",
                      required: "true",
                    }}
                    value={values.Title}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <FormikInputField
                    name="TimeDurationInSeconds"
                    // apiError={
                    //   addErr?.data?.data?.TimeDurationInSeconds ||
                    //   editErr?.data?.data?.TimeDurationInSeconds
                    // }
                    inputFieldProps={{
                      label: "Time Duration (Second)",
                      // type: "number",
                      // required: true,
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col d={6} className="mb-2">
                  <FormikTextAria
                    name="Description"
                    apiError={
                      Posterror?.data?.data?.description ||
                      puterror?.data?.data?.description
                    }
                    textAreaProps={{
                      label: "Description",
                      placeholder: "description",
                      required: true,
                    }}
                  />
                </Col>
                {values?.IsVideo ? (
                  <Col md={6} className="mb-2">
                    <FormikImageField
                      name="Image"
                      apiError={
                        Posterror?.data?.data?.image ||
                        puterror?.data?.data?.image
                      }
                      imageFieldProps={{
                        label:
                          "Video (Maximum video size: 10mb, supports : MP4, FLV)",
                        accept: ".mp4, .m4p, .m4v, .flv, .f4v",
                        required: "true",
                      }}
                    />
                    {values?.Image && <DisplayVideo value={values?.Image} />}
                  </Col>
                ) : (
                  <Col md={6} className="mb-2">
                    <FormikImageField
                      name="Image"
                      apiError={
                        Posterror?.data?.data?.image ||
                        puterror?.data?.data?.image
                      }
                      imageFieldProps={{
                        label:
                          "Image (Maximum image size: 3mb, supports : JPG/JPEG/PNG/GIF)",
                        accept: ".jpg, .jpeg, .bmp, .png, .webp, .gif",
                        required: "true",
                      }}
                    />
                    {values?.Image && (
                      <DisplayImage value={values?.Image} fieldName={"Image"} />
                    )}
                  </Col>
                )}
              </Row>
              <Row className="mb-1">
                <Col md={6} className="mt-4 mb-2">
                  <FormikCheckBox
                    name="IsVideo"
                    apiError={
                      Posterror?.data?.data?.isVideo ||
                      puterror?.data?.data?.isVideo
                    }
                    checkBoxProps={{
                      label: "Video",
                    }}
                  />
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
