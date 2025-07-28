import {
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form } from "formik";
import { Button, Col, Row } from "react-bootstrap";

export const SpecialHourTypeform = ({ close, apiErrors }) => {
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-3">
          <FormikInputField
            name="name"
            apiError={apiErrors?.data?.data?.name}
            inputFieldProps={{
              label: "Special hour type",
              required: true,
              placeholder: "Enter name",
            }}
          />
        </Col>
        <Col xs={12} className="mb-3">
          <label className="fw-medium pb-1">
            Description
            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
          </label>
          <FormikTextAria
            name="description"
            apiError={apiErrors?.data?.data?.description}
            textAreaProps={{
              // label: lang("description"),
              placeholder: lang("description"),
              // required: true,
            }}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-end p-1">
        <Button className="me-2" variant="outline-secondary" onClick={close}>
          Close
        </Button>
        <FormikSubmitButton className="me-2">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
};
