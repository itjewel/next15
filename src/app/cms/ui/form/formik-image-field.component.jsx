import { Field } from "formik";
import { useId } from "react";
import BSFile from "react-bootstrap/Form";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property {boolean} required
 */
/**
 * @typedef { import('react-bootstrap').FormControlProps & OtherProps } ImageFieldProps
 * @
 */

/**
 * @param { ImageFieldProps } props
 */
function ImageField({
  label,
  id,
  error,
  multiple,
  helperText,
  disabled,
  required,
  ...rest
}) {
  const generatedID = useId();
  const fileId = id || generatedID;

  //@TODO: should handle error later;

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={fileId} className="fw-medium">
          <span> {label}</span>
          {required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div>
        <BSFile.Control
          id={fileId}
          type="file"
          multiple={multiple}
          disabled={disabled}
          style={{
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
 *
 * @typedef {Object} FormikTextFieldProps
 * @property {string} apiError
 * @property {ImageFieldProps} imageFieldProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikTextFieldProps} props
 */
export function FormikImageField({
  imageFieldProps,
  apiError,
  disabled,
  multiple,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting, setFieldValue },
      }) => {
        return (
          <ImageField
            {...imageFieldProps}
            multiple={multiple == true ? true : false}
            onChange={(event) => {
              const imageFile =
                multiple == true ? event.target.files : event.target.files[0];
              setFieldValue(rest?.name, imageFile);
            }}
            onClick={(event) => {
              setFieldValue(rest?.name, (event.target.value = null));
            }}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : imageFieldProps?.helperText
            }
          />
        );
      }}
    </Field>
  );
}
