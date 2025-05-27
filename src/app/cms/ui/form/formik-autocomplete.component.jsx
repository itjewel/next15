import { Field, useField } from "formik";
import { useId } from "react";
import Select from "react-select";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef {Object} OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 * @property { number | string } disableOption
 *
 */

/**
 * @typedef {OtherProps & import ('react-select').Props} AutoCompleteProps
 */

/**
 *
 * @param {  AutoCompleteProps } props
 */
const Autocomplete = ({
  label,
  name,
  id,
  borderRadius = "5px",
  fontSize = "1rem",
  error,
  disabled,
  helperText,
  required,
  disableOption,
  styles,
  ...rest
}) => {
  const generatedID = useId();
  const autoCompleteId = id || generatedID;
  const [, meta] = useField(name);
  const errors = meta.error;

  const Error = () => {
    if (typeof errors === "object" && error) {
      const msz = errors[Object.keys(errors)[0]];

      return (
        <>
          {meta.error && meta.touched && (
            <small className={"text-danger"}>{msz}</small>
          )}
          {helperText && !errors && <small>{helperText}</small>}
        </>
      );
    } else if (typeof errors === "string" && error) {
      return (
        <>
          {meta.error && meta.touched && (
            <small className={"text-danger"}>{errors}</small>
          )}
          {helperText && !errors && <small>{helperText}</small>}
        </>
      );
    } else if (error) {
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
        <label htmlFor={autoCompleteId} className="fw-medium">
          <span> {label}</span>
          {required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div>
        <Select
          menuPortalTarget={document.body}
          id={autoCompleteId}
          name={name}
          className="fd-select2"
          options={rest?.options || []}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            borderRadius,
            control: (baseStyle, state) => ({
              ...baseStyle,
              borderRadius,
              fontSize,
              ...(error
                ? {
                    borderColor: "rgb(220, 53, 69)",
                  }
                : {}),
              minHeight: "0 !important",
              ...styles,
            }),
          }}
          {...rest}
        />
      </div>

      <Error />
    </FieldContainer>
  );
};

/**
 * @typedef {Object} FormikAutoCompleteProps
 * @property {AutoCompleteProps} autoCompleteProps
 * @property {string} apiError
 * @property {boolean} disabled
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikAutoCompleteProps } props
 */
export const FormikAutoComplete = ({
  autoCompleteProps,
  apiError,
  disabled,
  ...rest
}) => {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { error, touched },
        form: { isSubmitting, setFieldValue, setFieldTouched },
      }) => {
        return (
          <Autocomplete
            {...field}
            isDisabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            onChange={(value) => {
              setFieldValue(rest.name, value);
            }}
            onBlur={() => setFieldTouched(rest.name, true)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : autoCompleteProps?.helperText
            }
            {...autoCompleteProps}
          />
        );
      }}
    </Field>
  );
};
