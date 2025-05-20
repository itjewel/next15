import { Api, useGetOptions } from "features/api";
import {
  Col,
  FormikAutoComplete,
  FormikSubmitButton,
  FormikTextField,
  Row,
} from "features/ui";
import { Form, useFormikContext } from "formik";
import FormikTiptapEditor from "./editor/FormikTiptapEditor";
export const PlaceholderCreateForm = () => {
  const { setFieldValue } = useFormikContext();
  const placeholderTypeOptions = useGetOptions(Api.PlaceholderGetActionType);
  const changeInputValue = (value: string, prevValue: string = "") => {
    const rawValue = value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");

    const cleaned = rawValue.replace(/_+/g, "_");

    if (cleaned.endsWith("_") && prevValue.endsWith("_")) {
      return prevValue;
    }

    return cleaned;
  };

  return (
    <Form>
      <Row>
        <Col className="col-12 sm:col-12 md:col-6 lg:col-6">
          <FormikTextField
            name="name"
            textFieldProps={{
              label: "Name",
              placeholder: "Placeholder name",
              onChange: (e) => {
                const transformedValue = changeInputValue(e.target.value);
                setFieldValue("name", transformedValue);
              },
              required: true,
            }}
          />
        </Col>
        <Col className="col-12 sm:col-12 md:col-6 lg:col-6">
          <FormikTextField
            name="description"
            textFieldProps={{
              label: "Description",
              placeholder: "Placeholder description",
              required: true,
            }}
          />
        </Col>
        <Col className="col-12 sm:col-12 md:col-6 lg:col-6">
          <FormikAutoComplete
            name="actionType"
            autoCompleteProps={{
              menuPosition: "fixed",
              label: "Action Type",
              placeholder: "Please select a Action type",
              options: placeholderTypeOptions?.options,
              isLoading: placeholderTypeOptions?.isLoading,
              required: true,
            }}
          />
        </Col>

        <Col className="col-12 sm:col-12 md:col-6 lg:col-6">
          <FormikTextField
            name="sampleText"
            textFieldProps={{
              label: "Sample Text",
              type: "text",
              placeholder: "Please enter sample text",
            }}
          />
        </Col>
        <Col className="col-12 sm:col-12 md:col-12 lg:col-12">
          <FormikTiptapEditor name="action" label="Action" />
        </Col>
      </Row>
      <div className="mt-5 flex align-items-end justify-content-end">
        <FormikSubmitButton>Submit</FormikSubmitButton>
      </div>
    </Form>
  );
};
