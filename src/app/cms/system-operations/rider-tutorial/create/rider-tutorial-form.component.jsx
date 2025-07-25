import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form } from "formik";
import { Button, Col, Row } from "react-bootstrap";

export const RiderTutorialForm = ({ close, apiErrors }) => {
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="title"
            apiError={apiErrors?.data?.data?.title}
            inputFieldProps={{
              label: "Title",
              required: true,
              placeholder: "Enter tutorial title name",
            }}
          />

          <div className="mt-2">
            <FormikInputField
              name="videoURL"
              apiError={apiErrors?.data?.data?.videoURL}
              inputFieldProps={{
                label: "Video URL",
                required: true,
                placeholder: "Enter the Tutorial link",
              }}
            />
          </div>
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
