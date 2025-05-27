import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form } from "formik";
import { Col, Row } from "react-bootstrap";

export const Weekdayform = ({ close }) => {
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="name"
            inputFieldProps={{ label: "Name", required: true }}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-end p-1">
        <FormikSubmitButton className="me-2" variant="danger" onClick={close}>
          Close
        </FormikSubmitButton>
        <FormikSubmitButton className="me-2">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
};
