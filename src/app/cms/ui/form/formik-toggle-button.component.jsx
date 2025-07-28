import { Field } from "formik";
import { useId } from "react";
import BSButtonGroup from "react-bootstrap/ButtonGroup";
import BSToggleButton from "react-bootstrap/ToggleButton";
import { FieldContainer } from "./field-container.component";

/**
 *
 * @typedef {Object} OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property {Array} options
 * @property {boolean} required
 */

/**
 * @typedef {OtherProps & import ('react-bootstrap/ToggleButton').ToggleButtonProps } ToggleBtnProps
 */

/**
 *
 * @param { ToggleBtnProps} props
 */
function ToggleButton({
  name,
  id,
  label,
  disabled,
  error,
  helperText,
  options = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ],
  ...rest
}) {
  const generatedID = useId();
  const buttonId = id || generatedID;
  const { value, ...otherRest } = rest;

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={buttonId} className="fw-medium">
          <span> {label}</span>
          {rest.required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div className="formik-select-field">
        <BSButtonGroup>
          {options?.map((radio, idx) => (
            <BSToggleButton
              key={idx}
              id={`radio-${buttonId}-${idx}`}
              type="radio"
              variant="outline-primary"
              name={buttonId}
              checked={rest.value === radio.value}
              value={radio.value}
              disabled={disabled}
              className={`${rest.className}`}
              {...otherRest}
            >
              {radio.label}
            </BSToggleButton>
          ))}
        </BSButtonGroup>
      </div>

      {error && <small className={"text-danger"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </FieldContainer>
  );
}

/**
 *
 * @typedef {Object} FormikToggleButtonProp
 * @property {string} apiError
 * @property {ToggleBtnProps} toggleButtonProps
 */

/**
 *
 * @param { FormikToggleButtonProp & import("formik").GenericFieldHTMLAttributes } props
 */
export function FormikToggleButton({
  toggleButtonProps,
  apiError,
  disabled,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting, setFieldValue, setFieldTouched },
      }) => {
        return (
          <ToggleButton
            {...field}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            onBlur={() => setFieldTouched(rest.name)}
            onChange={(e) => {
              // console.log({ e });
              setFieldValue(rest.name, e.currentTarget.value);
            }}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : toggleButtonProps?.helperText
            }
            {...toggleButtonProps}
          />
        );
      }}
    </Field>
  );
}
