import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const usePagePermission = () => {
  const { pathname } = useLocation();
  const { permission } = useSelector((state) => state.userCredential);
  const permissions = permission?.[pathname] || {};
  return permissions;
};
