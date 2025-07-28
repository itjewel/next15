import { Field } from "formik";
import { useId } from "react";
import { InputGroup } from "react-bootstrap";
import BSFile from "react-bootstrap/Form";
import {
  CropDisplayImage,
  ImageCropModal,
  ImageCropProvider,
  useImageCropContext,
} from "..";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property {boolean} required
 * @property {number} aspectratio
 */
/**
 * @typedef { import('react-bootstrap').FormControlProps & OtherProps } ImageCropFieldProps
 */

/**
 * @param { ImageCropFieldProps } props
 */
function ImageField({
  label,
  id,
  error,
  helperText,
  disabled,
  required,
  ...rest
}) {
  const generatedID = useId();
  const fileId = id || generatedID;
  const { field } = useImageCropContext();

  let filename = "";
  if (field?.value?.name) {
    filename = field?.value?.name;
  } else if (typeof field?.value === "string") {
    filename = field?.value.includes("/")
      ? field?.value.split("/").pop()
      : field?.value;
  }

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={fileId} className="fw-medium">
          <span>{label}</span>
          {required && <span className="text-danger ps-1">*</span>}

          <InputGroup className="crop-field">
            <InputGroup.Text>Choose File</InputGroup.Text>
            <span className="form-control text-break">
              {filename || "No file chosen"}
            </span>
          </InputGroup>
        </label>
      )}

      <div>
        <BSFile.Control
          id={fileId}
          type="file"
          disabled={disabled}
          style={{
            display: "none",
            borderColor: "hsl(0, 0%, 80%)",
            borderRadius: "4px",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          {...rest}
        />
        {error && <small className={"text-danger"}>{helperText}</small>}
        {helperText && !error && <small>{helperText}</small>}
      </div>
    </FieldContainer>
  );
}

/**
 * @typedef { Object } DisplayImageProps
 * @property {number} height
 * @property {number} width
 * @property {number} borderRadius
 * @property {string} alt
 * @property {()=> void} setDelete
 */

/**
 *
 * @typedef {Object} FormikImageCropFieldProps
 * @property {string} apiError
 * @property {ImageCropFieldProps} imageCropFieldProps
 * @property {DisplayImageProps} displayImageProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikImageCropFieldProps} props
 */
export function FormikCropImageField({
  imageCropFieldProps,
  displayImageProps,
  apiError,
  disabled,
  setDelete = () => {},
  ...rest
}) {
  return (
    <ImageCropProvider name={rest?.name}>
      <Field {...rest}>
        {({
          field,
          meta: { touched, error },
          form: { isSubmitting, setFieldValue },
        }) => {
          const { setImage, image, setFileEvent, canclePrevFile, form } =
            useImageCropContext();
          return (
            <>
              <ImageCropModal aspectRatio={imageCropFieldProps?.aspectratio} />
              <ImageField
                {...imageCropFieldProps}
                onChange={(event) => {
                  const imageFile = event.target.files[0];
                  setFieldValue(rest?.name, imageFile);
                  imageFile && setImage(URL.createObjectURL(imageFile));
                  setFileEvent(event);
                  const fileInput = event.target;
                  if (!fileInput.value) {
                    form.setValue(canclePrevFile);
                  }
                }}
                disabled={disabled || isSubmitting}
                error={!!apiError || (touched && !!error)}
                helperText={
                  apiError
                    ? apiError
                    : touched && !!error
                    ? error
                    : imageCropFieldProps?.helperText
                }
              />

              {field?.value && !image && (
                <CropDisplayImage
                  {...displayImageProps}
                  value={
                    typeof field?.value === "string"
                      ? field?.value.startsWith("/")
                        ? field?.value
                        : `/${field?.value}`
                      : field?.value
                  }
                  fieldName={rest?.name}
                  setDelete={displayImageProps?.setDelete}
                />
              )}
            </>
          );
        }}
      </Field>
    </ImageCropProvider>
  );
}
