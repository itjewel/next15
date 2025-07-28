import {
  DetailsImage,
  FormikCropImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form, useFormikContext } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RestaurantTutorialForm = ({
  close,
  getByIdData,
  id,
  apiErrors,
}) => {
  const { values } = useFormikContext();

  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="Title"
            apiError={apiErrors?.data?.data?.title}
            inputFieldProps={{
              label: "Title",
              required: true,
              placeholder: "Enter tutorial title name",
            }}
          />
          <div className="mt-2">
            <FormikTextAria
              name="Description"
              textAreaProps={{
                label: lang("description"),
                placeholder: lang("description"),
              }}
            />
          </div>
          {id && (
            <div className="mt-2">
              {getByIdData?.data?.isVideo ? (
                <div>
                  <span className="fw-bold">Current video url:</span>{" "}
                  <Link>{getByIdData?.data?.url}</Link>
                </div>
              ) : (
                <Card className="mb-3">
                  <Card.Header className="fw-bold">Current Image</Card.Header>
                  <Card.Body>
                    <Row className="d-flex justify-content-between">
                      <div className="col-md-6">
                        <DetailsImage value={getByIdData?.data?.url} />
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}

          {!values?.File && (
            <div className="mt-2">
              <FormikInputField
                name="Url"
                inputFieldProps={{
                  label: "URL",
                  placeholder: "Enter the Tutorial link",
                }}
              />
            </div>
          )}
          {!values?.Url && (
            <div className="mt-2">
              <FormikCropImageField
                name="File"
                apiError={apiErrors?.data?.data?.File}
                imageCropFieldProps={{
                  aspectratio: 16 / 9,
                  label:
                    "Image (Maximum image size: 3mb, supports : JPG/JPEG/PNG)",
                  accept: ".jpg, .jpeg, .png",
                }}
              />
            </div>
          )}
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button
          size="sm"
          className="me-2"
          variant="outline-secondary"
          onClick={close}
        >
          Close
        </Button>
        <FormikSubmitButton>Submit</FormikSubmitButton>
      </div>
    </Form>
  );
};
