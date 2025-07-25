import { Field } from "formik";
import { useId } from "react";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 */

/**
 * @typedef { HTMLInputElement & OtherProps } InputFieldProps
 */

/**
 * @param {  InputFieldProps } props
 */
function TextField({
  name,
  id,
  label,
  disabled,
  error,
  required,
  helperText,
  ...rest
}) {
  const generatedID = useId();
  const inputId = id || generatedID;

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={inputId} className="fw-medium">
          <span> {label}</span>
          {required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        className={`form-control ${error ? "border-danger" : ""} ${
          rest?.className
        }`}
        disabled={disabled}
        {...rest}
        style={{
          borderColor: "hsl(0, 0%, 80%)",
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: "1px",
          ...rest.style,
        }}
      />

      {error && <small className={"text-danger"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </FieldContainer>
  );
}

/**
 *
 * @typedef {Object} FormikTextFieldProps
 * @property {string} apiError
 * @property {InputFieldProps} inputFieldProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikTextFieldProps} props
 */
export function FormikInputField({
  inputFieldProps,
  apiError,
  disabled,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({ field, meta: { touched, error }, form: { isSubmitting } }) => (
        <TextField
          {...field}
          {...inputFieldProps}
          disabled={disabled || isSubmitting}
          error={!!apiError || (touched && !!error)}
          helperText={
            apiError
              ? apiError
              : touched && !!error
              ? error
              : inputFieldProps?.helperText
          }
        />
      )}
    </Field>
  );
}
