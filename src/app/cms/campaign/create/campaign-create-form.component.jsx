import {
  CardWrapper,
  FormikCheckBox,
  FormikCropImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  FormikTextAria,
  FormikToggleButton,
} from "@/features/ui";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";
import { Form, useFormikContext } from "formik";
import { Col, Row } from "react-bootstrap";
import { PromoTypes } from "./promo-types";
import { discountTypes } from "./form.config";

export function CampaignCreateForm({
  setDelete,
  refType,
  allCities,
  restaurants,
  allZonesOptions,
  allBrancheOptions,
  apiErrors,
}) {
  const { values, setFieldValue, resetField } = useFormikContext();

  return (
    <CardWrapper>
      <Form>
        {/* <p>{JSON.stringify(values)}</p> */}
        <Row>
          <Col sm={12} md={3} className="mb-3">
            <FormikInputField
              name="name"
              apiError={apiErrors?.data?.data?.name}
              inputFieldProps={{
                label: lang("name"),
                placeholder: lang("name"),
                required: true,
              }}
            />
          </Col>
          <Col sm={12} md={3} className="mb-3">
            <FormikInputField
              name="startDate"
              inputFieldProps={{
                label: "Start date",
                placeholder: lang("start_date"),
                required: true,
                type: "datetime-local",
              }}
            />
          </Col>
          <Col sm={12} md={3} className="mb-3">
            <FormikInputField
              name="endDate"
              inputFieldProps={{
                label: "End date",
                placeholder: lang("end_date"),
                required: true,
                type: "datetime-local",
              }}
            />
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <FormikInputField
              name="startTime"
              inputFieldProps={{
                label: "Start time",
                type: "time",
                required: true,
              }}
            />
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <FormikInputField
              name="endTime"
              inputFieldProps={{
                label: "End time",
                type: "time",
                required: true,
              }}
            />
          </Col>
          <Col sm={12} md={3} className="mb-3">
            <FormikSelectField
              name="referenceTypeId"
              apiError={apiErrors?.data?.data?.referenceTypeId}
              selectFieldProps={{
                label: "Reference type",
                options: refType?.items || [],
                required: true,
              }}
            />
          </Col>
          <Col sm={12} md={3} className="mt-6">
            <FormikToggleButton
              name="discountType"
              toggleButtonProps={{
                label: "Discount Type",
                // required: true,
                // placeholder: "Select Discount Type",
                options: discountTypes,
                // isMulti: false,
                // isClearable: true,
              }}
            />
          </Col>
          {values.discountType === "percent" && (
            <Col sm={12} md={3} className="mb-3">
              <FormikInputField
                name="discountInPercent"
                inputFieldProps={{
                  label: "Discount Percentage (%)",
                  placeholder: "Enter Discount Percentage",
                }}
              />
            </Col>
          )}
          {values.discountType === "amount" && (
            <Col sm={12} md={3} className="mb-3">
              <FormikInputField
                name="discountInAmount"
                inputFieldProps={{
                  label: "Discount Amount",
                  placeholder: "Enter Discount Amount",
                }}
              />
            </Col>
          )}
        </Row>

        {/* <Row>
          <Col sm={12} md={4} className="mb-3">
            <FormikSelectField
              name="referenceTypeId"
              selectFieldProps={{
                label: "Reference type",
                options: refType?.items || [],
                required: true,
              }}
            />
          </Col>
        </Row> */}
        <Row>
          <PromoTypes
            allZonesOptions={allZonesOptions}
            allBrancheOptions={allBrancheOptions}
            values={values}
            setFieldValue={setFieldValue}
            resetField={resetField}
            allCities={allCities}
            restaurants={restaurants}
          />
        </Row>
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <FormikTextAria
              name="description"
              textAreaProps={{
                label: lang("description"),
                placeholder: lang("description"),
                rows: "3",
                required: true,
              }}
            />
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <FormikCropImageField
              name="fileImage"
              imageCropFieldProps={{
                aspectratio: 16 / 9,
                label:
                  "Details Image (Maximum image size: 3mb, supports:JPG/JPEG/PNG)",
                accept: ".jpg, .jpeg, .png",
                required: true,
              }}
              displayImageProps={setDelete}
            />
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <FormikCropImageField
              key={values?.isInTop ? "isInTop-true" : "isInTop-false"}
              name="bannerFileImage"
              imageCropFieldProps={{
                aspectratio: values?.isInTop ? 1.43 / 1 : 21 / 9,
                label:
                  "Banner Image (Maximum image size: 3mb, supports:JPG/JPEG/PNG)",
                accept: ".jpg, .jpeg, .png",
                required: true,
              }}
              displayImageProps={setDelete}
            />
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <FormikCheckBox
              name="isInTop"
              checkBoxProps={{
                label: "Show at top",
                onClick: (event) => {
                  let val = event.target.value === "true" ? false : true;
                  setFieldValue("isInTop", val);
                  setFieldValue("bannerFileImage", "");
                },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={12}>
            <FormikCheckBox
              name="isPickup"
              checkBoxProps={{
                label: "Pickup",
              }}
            />
          </Col>
          <Col md={3} sm={12}>
            <FormikCheckBox
              name="isDelivery"
              checkBoxProps={{
                label: "Delivery",
              }}
            />
          </Col>
          <Col md={3} sm={12}>
            <FormikCheckBox
              name="isDineIn"
              checkBoxProps={{
                label: "Dine In",
              }}
            />
          </Col>
          <Col md={3} sm={12}>
            <FormikCheckBox
              name="isFlower"
              checkBoxProps={{
                label: "Flower",
              }}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
        </div>
      </Form>
    </CardWrapper>
  );
}
