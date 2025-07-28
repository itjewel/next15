import { Api, useGetOptions } from "features/api";
import {
  Col,
  FormikAutoComplete,
  FormikSubmitButton,
  FormikTextArea,
  FormikTextField,
  Row,
} from "features/ui";
import { Form } from "formik";
import FormikTiptapEditor from "./editor/FormikTiptapEditor";

export const MessageTemplateCreateForm = () => {
  const placeholderTypeOptions = useGetOptions(Api.MessageTemplateGetOption);

  return (
    <Form>
      <Row>
        <Col className="col-12 sm:col-12 md:col-12 lg:col-12">
          <FormikTextField
            name="name"
            textFieldProps={{
              label: "Name",
              placeholder: "Message template name",
              required: true,
            }}
          />
        </Col>
        <Col className="col-12 sm:col-12 md:col-12 lg:col-12">
          {/* <FormikTextArea
            name="body"
            textAreaProps={{
              label: "Body",
              placeholder: "Message template body",
              required: true,
            }}
          /> */}

          <FormikTiptapEditor name="body" label="Body" />
        </Col>
        {/* <Col className="col-12 sm:col-12 md:col-6 lg:col-6">
          <FormikAutoComplete
            name="placeholders"
            autoCompleteProps={{
              menuPosition: "fixed",
              label: "Placeholders",
              placeholder: "Please select a placeholders",
              options: placeholderTypeOptions?.options,
              isLoading: placeholderTypeOptions?.isLoading,
              isMulti: true,
            }}
          />
        </Col> */}
      </Row>
      <div className="mt-5 flex align-items-end justify-content-end">
        <FormikSubmitButton>Submit</FormikSubmitButton>
      </div>
    </Form>
  );
};
