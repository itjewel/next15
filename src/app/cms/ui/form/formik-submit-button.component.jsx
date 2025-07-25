import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

/**
 *
 * @param { import("react").PropsWithChildren & import('react-bootstrap/Button').ButtonProps } props
 */
export const FormikSubmitButton = ({
  children,
  type = "submit",
  disabled,
  ...rest
}) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      className=""
      type={type}
      disabled={disabled || isSubmitting}
      {...rest}
    >
      {isSubmitting && (
        <div
          className="spinner-border spinner-border-sm text-light me-1"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {children}
    </Button>
  );
};
