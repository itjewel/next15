import { Field } from "formik";
import { useId } from "react";
import BSForm from "react-bootstrap/Form";
import { FieldContainer } from "./field-container.component";

/**
 *
 * @typedef {Object} OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property {boolean} required
 */

/**
 * @typedef {OtherProps & import ('react-bootstrap/Form').FormProps } SwitchButtonProps
 */

/**
 *
 * @param { SwitchButtonProps} props
 */
const Switch = ({ name, id, label, error, helperText, ...rest }) => {
  const generatedID = useId();
  const buttonId = id || generatedID;

  return (
    <FieldContainer className="formik-switch">
      {label && (
        <label htmlFor={buttonId} className="fw-medium">
          <span> {label}</span>
          {rest.required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div>
        <BSForm.Check
          id={buttonId}
          name={name}
          type="switch"
          label={rest.value === true ? "Yes" : "No"}
          {...rest}
        />
      </div>

      {error && <small className={"text-danger"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </FieldContainer>
  );
};

/**
 *
 * @typedef {Object} FormikSwitchButtonProp
 * @property {string} apiError
 * @property { SwitchButtonProps  } switchButtonProps
 * @property { boolean } disabled
 */

/**
 *
 * @param { FormikSwitchButtonProp & import("formik").GenericFieldHTMLAttributes } props
 */
export const FormikSwitchButton = ({
  apiError,
  switchButtonProps,
  disabled,
  ...rest
}) => {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting, setFieldValue, setFieldTouched },
      }) => (
        <Switch
          {...field}
          {...switchButtonProps}
          onChange={(e) => setFieldValue(rest.name, e.target.checked)}
          onBlur={() => setFieldTouched(rest.name)}
          helperText={
            apiError
              ? apiError
              : touched && !!error
              ? error
              : switchButtonProps?.helperText
          }
          checked={field.value}
          disabled={disabled || isSubmitting}
          error={!!apiError || (touched && !!error)}
        />
      )}
    </Field>
  );
};
