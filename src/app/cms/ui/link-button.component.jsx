import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

/**
 *
 * @typedef {Object} OtherProps
 * @property {string} className
 * @property {string} btnName
 */

/**
 *
 * @typedef {  Partial<OtherProps>  } linkButtonProps
 *
 */
export function LinkButton({ className = "", btnName = "", to = "", ...rest }) {
  const { pathname } = useLocation();
  const { permission } = useSelector((state) => state.userCredential);

  const isPermitted = () => {
    const p = pathname.split("/").filter((el) => el);
    const pName = `/${p?.[0]}`;

    if (p.length > 1) {
      if (!permission?.[pName]?.[p?.[1]]) {
        return false;
      }
    } else {
      if (!permission?.[pName]?.create) {
        return false;
      }
    }

    return true;
  };

  if (!isPermitted()) {
    return null;
  }

  return (
    <Link to={to} className="btn btn-outline-primary" {...rest}>
      {btnName}
    </Link>
  );
}
