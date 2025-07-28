import { Field } from "formik";
import { useId } from "react";
import Form from "react-bootstrap/Form";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef { Object } OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 */

/**
 * @typedef {  import('react-bootstrap').FormControlProps & OtherProps } TextAreaProps
 */

/**
 * @param {  TextAreaProps } props
 */
function TextArea({
  id,
  label,
  disabled,
  error,
  helperText,
  className,
  required = false,
  ...rest
}) {
  const generatedID = useId();
  const textAreaId = id || generatedID;

  const Error = () => {
    if (typeof helperText === "object") {
      const msz = helperText[Object.keys(helperText)[0]];
      return (
        <>
          {error && <small className={"text-danger"}>{msz}</small>}
          {helperText && !error && <small>{msz}</small>}
        </>
      );
    } else {
      return (
        <>
          {error && <small className="text-danger">{helperText}</small>}
          {helperText && !error && (
            <small className="text-secondary">{helperText}</small>
          )}
        </>
      );
    }
  };

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={textAreaId} className="fw-medium">
          <span> {label}</span>
          {required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div>
        <Form.Control
          id={textAreaId}
          as="textarea"
          disabled={disabled}
          className={`${error ? "border-danger" : ""} ${className}`}
          {...rest}
          style={{
            borderColor: "hsl(0, 0%, 80%)",
            borderRadius: "4px",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        />

        <Error />
      </div>
    </FieldContainer>
  );
}

/**
 *
 * @typedef {Object} FormikTextAreaProps
 * @property {string} apiError
 * @property {TextAreaProps} textAreaProps
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikTextAreaProps} props
 */
export function FormikTextAria({ textAreaProps, apiError, disabled, ...rest }) {
  return (
    <Field {...rest}>
      {({ field, meta: { touched, error }, form: { isSubmitting } }) => {
        return (
          <TextArea
            {...field}
            {...textAreaProps}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : textAreaProps?.helperText
            }
          />
        );
      }}
    </Field>
  );
}
