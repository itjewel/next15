import { Field } from "formik";
import { useId } from "react";
import Select from "react-bootstrap/FormSelect";
import { FieldContainer } from "./field-container.component";

/**
 *
 * @typedef {Object} OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property {Array} options
 */

/**
 * @typedef {OtherProps & import ('react-bootstrap/FormSelect').FormSelectProps } SelectFieldProps
 */

/**
 *
 * @param { SelectFieldProps} props
 */
function SelectField({
  name,
  id,
  label,
  disabled,
  placeholder,
  error,
  helperText,
  options = [],
  required,
  ...rest
}) {
  const generatedID = useId();
  const inputId = id || generatedID;

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
          {error && <small className={"text-danger"}>{helperText}</small>}
          {helperText && !error && <small>{helperText}</small>}
        </>
      );
    }
  };

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={inputId}>
          <span className="fw-medium"> {label}</span>
          {required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <Select
        id={inputId}
        name={name}
        disabled={disabled}
        className={`${error ? "border-danger" : ""} ${rest.className}`}
        style={{
          borderColor: "hsl(0, 0%, 80%)",
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: "1px",
        }}
        {...rest}
      >
        <option value="">
          {placeholder ? `${placeholder}` : "---Please select ---"}
        </option>
        {options?.map((op) => (
          <option key={op.value} value={op?.value} disabled={op?.disabled}>
            {op?.label}
          </option>
        ))}
      </Select>

      <Error />
    </FieldContainer>
  );
}

/**
 *
 * @typedef {Object} FormikSelectFieldProp
 * @property {string} apiError
 * @property {SelectFieldProps} selectFieldProps
 */

/**
 *
 * @param { FormikSelectFieldProp & import("formik").GenericFieldHTMLAttributes } props
 */
export function FormikSelectField({
  selectFieldProps,
  apiError,
  disabled,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({ field, meta: { touched, error }, form: { isSubmitting } }) => {
        return (
          <SelectField
            {...field}
            {...selectFieldProps}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : selectFieldProps?.helperText
            }
          />
        );
      }}
    </Field>
  );
}
