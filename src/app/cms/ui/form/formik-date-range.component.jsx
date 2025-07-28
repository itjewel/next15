import { Field, useField } from "formik";
import { useId } from "react";
import ReactDatePicker from "react-datepicker";
import { FieldContainer } from "./field-container.component";

/**
 * @typedef {Object} OtherProps
 * @property {string} label
 * @property { string } helperText
 * @property { boolean } error
 */

/**
 * @typedef {OtherProps & import ('react-datepicker').ReactDatePicker & import ('react-datepicker').ReactDatePickerProps & import ('react-datepicker').ReactDatePickerCustomHeaderProps & import ('react-datepicker').CalendarContainerProps} DateRangeProps
 */

/**
 *
 * @param {  DateRangeProps } props
 */
function DateRange({ label, name, id, error, disabled, helperText, ...rest }) {
  const generatedID = useId();
  const dateRangeId = id || generatedID;
  const [field, meta, helpers] = useField(name);
  const errors = meta.error;

  const Error = () => {
    if (typeof errors === "object") {
      const msz = errors[Object.keys(errors)[0]];
      return (
        <>
          {meta.error && meta.touched && (
            <small className={"text-danger"}>{msz}</small>
          )}
          {helperText && !errors && <small>{helperText}</small>}
        </>
      );
    } else {
      return (
        <>
          {errors && meta.touched && (
            <small className={"text-danger"}>{errors}</small>
          )}
          {Boolean(helperText && !errors) && <small>{helperText}</small>}
        </>
      );
    }
  };

  return (
    <FieldContainer>
      {label && (
        <label htmlFor={inputId} className="fw-medium">
          <span> {label}</span>
          {rest.required && <span className="text-danger ps-1">*</span>}
        </label>
      )}

      <div>
        <ReactDatePicker
          selectsRange={true}
          isClearable={true}
          id={dateRangeId}
          name={name}
          disabled={disabled}
          className={`${
            errors && meta.touched ? "border-danger" : ""
          } border rounded-1 py-1 px-2 font-inherit`}
          {...rest}
        />
      </div>

      <Error />
    </FieldContainer>
  );
}

/**
 * @typedef {Object} FormikDateRangeProps
 * @property {DateRangeProps} dateRangeProps
 * @property {string} apiError
 * @property {boolean} disabled
 */

/**
 *
 * @param { import("formik").GenericFieldHTMLAttributes & FormikDateRangeProps } props
 */
export function FormikDateRange({
  dateRangeProps,
  apiError,
  disabled,
  ...rest
}) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { error, touched },
        form: { isSubmitting, setFieldValue, setFieldTouched },
      }) => {
        const [startDate, endDate] = field?.value || [];

        return (
          <DateRange
            {...field}
            {...dateRangeProps}
            onChange={(value) => {
              setFieldValue(rest?.name, value);
            }}
            onFocus={() => setFieldTouched(rest.name)}
            startDate={startDate}
            endDate={endDate}
            disabled={disabled || isSubmitting}
            error={!!apiError || (touched && !!error)}
            helperText={
              apiError
                ? apiError
                : touched && !!error
                ? error
                : dateRangeProps?.helperText
            }
          />
        );
      }}
    </Field>
  );
}
