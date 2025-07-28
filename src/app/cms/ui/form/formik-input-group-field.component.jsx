import { Field } from "formik";
import { useId } from "react";
import { InputGroup } from "react-bootstrap";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property {string} groupLabel
 * @property { string } helperText
 * @property { boolean } error
 */

/**
 * @typedef { HTMLInputElement & OtherProps } InputGroupFieldProps
 */

/**
 * @param {  InputGroupFieldProps } props
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
    <>
      <FieldContainer>
        {label && (
          <label htmlFor={inputId} className="fw-medium">
            <span> {label}</span>
            {required && <span className="text-danger ps-1">*</span>}
          </label>
        )}

        <InputGroup>
          <InputGroup.Text>{rest?.groupLabel}</InputGroup.Text>
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
              borderRadius: "0 4px 4px 0",
              borderStyle: "solid",
              borderWidth: "1px",
              ...rest.style,
            }}
          />
        </InputGroup>
        {error && <small className={"text-danger"}>{helperText}</small>}
        {helperText && !error && <small>{helperText}</small>}
      </FieldContainer>
    </>
  );
}

/**
 *
 * @typedef {Object} FormikTextFieldProps
 * @property {string} apiError
 * @property {InputGroupFieldProps} inputGroupFieldProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikTextFieldProps} props
 */
export function FormikInputGroupField({
  inputGroupFieldProps,
  apiError,
  disabled,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({ field, meta: { touched, error }, form: { isSubmitting } }) => (
        <TextField
          {...field}
          {...inputGroupFieldProps}
          disabled={disabled || isSubmitting}
          error={!!apiError || (touched && !!error)}
          helperText={
            apiError
              ? apiError
              : touched && !!error
              ? error
              : inputGroupFieldProps?.helperText
          }
        />
      )}
    </Field>
  );
}
