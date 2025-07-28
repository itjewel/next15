import { useAuth } from "@/features/auth";
import { RouteGuardProvider, RouteVisibility } from "@gswag/react-route-guard";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../api";
import { PageLoader } from "./page-loader.component";

const isPermitted = (currentPath = "", permissions = {}) => {
  const pathnamesArr =
    currentPath === "/"
      ? ["/"]
      : currentPath?.split("/").filter((path) => path);

  // TODO: JUST FOR BLOCKING ISSUE;
  // FIX IT LATER

  if (currentPath.includes("/disconnected-child")) {
    if (permissions?.["/disconnected-tree"]?.list) {
      return {
        isFound: true,
        hasPermission: true,
      };
    }

    return {
      isFound: true,
      hasPermission: false,
    };
  }

  if (currentPath.includes("/tree")) {
    if (currentPath === "/tree") {
      if (!permissions?.["/tree"]?.list) {
        return {
          isFound: true,
          hasPermission: false,
        };
      }
    } else if (currentPath === "/tree/create") {
      if (!permissions?.["/tree"]?.create) {
        return {
          isFound: true,
          hasPermission: false,
        };
      }
    } else if (currentPath.includes("/tree/edit")) {
      if (!permissions?.["/tree"]?.edit) {
        return {
          isFound: true,
          hasPermission: false,
        };
      }
    } else if (currentPath.includes("/tree/update")) {
      if (!permissions?.["/tree"]?.details) {
        return {
          isFound: true,
          hasPermission: false,
        };
      }
    } else {
      if (!permissions?.["/tree"]?.list) {
        return {
          isFound: true,
          hasPermission: false,
        };
      }
    }

    return {
      isFound: true,
      hasPermission: true,
    };
  }

  if (
    currentPath.includes("/user-invoice") ||
    currentPath.includes("/rider-invoice") ||
    currentPath.includes("/restaurant-invoice")
  ) {
    if (
      permissions?.["/dispatch-panel"]?.["invoice"] ||
      permissions?.["/order-dispatch"]?.["invoice"]
    ) {
      return {
        isFound: true,
        hasPermission: true,
      };
    }

    return {
      isFound: true,
      hasPermission: false,
    };
  }

  if (currentPath.includes("/order-dispatch/edit")) {
    if (permissions?.["/dispatch-panel"]?.edit) {
      return {
        isFound: true,
        hasPermission: true,
      };
    }

    return {
      isFound: true,
      hasPermission: false,
    };
  }

  if (pathnamesArr.length === 1) {
    // check permission
    // length one means its a list page;
    const isFound = Boolean(permissions?.[currentPath]);
    if (isFound) {
      const hasPermission = Boolean(permissions?.[currentPath]?.list);
      return {
        isFound,
        hasPermission,
      };
    } else {
      return {
        isFound,
      };
    }
  } else {
    const baseURL = `/${pathnamesArr?.[0]?.toLowerCase()}`;
    const actionName = pathnamesArr?.[1]?.toLowerCase();
    const isFound = Boolean(permissions?.[baseURL]);

    if (isFound) {
      if (actionName) {
        const hasPermission = Boolean(permissions?.[baseURL]?.[actionName]);
        return {
          isFound,
          hasPermission,
        };
      } else {
        return {
          isFound: true,
          hasPermission: false,
        };
      }
    } else {
      return {
        isFound,
      };
    }
  }
};

function Loading() {
  return (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
      {/* <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> */}
      <PageLoader />
    </div>
  );
}

export function Guard({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //  const { accessToken, user, permission } = useSelector(
  //    (state) => state.userCredential
  //  );
  const { accessToken: token } = getTokenFromLocalStorage();
  const { user, permission } = useSelector((state) => state.userCredential);
  const { accessToken } = useAuth();

  const isLogin = accessToken
    ? accessToken && user?.userId
    : token && user?.userId;

  const redirectToLogin = () => {
    localStorage.removeItem("intendedPath");
    return {
      visibility: RouteVisibility.Redirect,
      targetRoute: pathname,
      redirectRoute: "/auth/login",
    };
  };

  const redirectToPath = () => {
    localStorage.removeItem("intendedPath");
    return {
      visibility: RouteVisibility.Show,
      targetRoute: pathname,
      redirectRoute: "",
    };
  };

  const redirectToAccessDenied = () => {
    localStorage.removeItem("intendedPath");
    return {
      visibility: RouteVisibility.Redirect,
      targetRoute: pathname,
      redirectRoute: "/access-denied",
    };
  };

  const redirectToNotFound = () => {
    return {
      visibility: RouteVisibility.Redirect,
      targetRoute: pathname,
      redirectRoute: "/404",
    };
  };

  const redirectToWelcome = () => ({
    visibility: RouteVisibility.Redirect,
    targetRoute: pathname,
    redirectRoute: "/welcome",
  });

  const routeAdvisor = ({ pathname, isLogin }) => {
    if (pathname.includes("/auth")) {
      if (
        pathname === "/auth/login" ||
        pathname === "/auth/forget-password" ||
        pathname === "/auth/login/mfa" ||
        pathname === "/auth/login/2fa"
      ) {
        if (isLogin) {
          const url = permission?.["/"] ? "/" : "/welcome";

          return {
            visibility: RouteVisibility.Redirect,
            targetRoute: pathname,
            redirectRoute: url,
          };
        } else {
          return {
            visibility: RouteVisibility.Show,
            targetRoute: pathname,
            redirectRoute: "",
          };
        }
      }
    } else {
      if (isLogin) {
        if (pathname === "/welcome") {
          return redirectToPath();
        }
        if (pathname === "/access-denied" || pathname === "/404") {
          return {
            visibility: RouteVisibility.Show,
            targetRoute: pathname,
            redirectRoute: "",
          };
        } else {
          const per = isPermitted(pathname, permission);

          if (!per.isFound) {
            if (pathname === "/") {
              return redirectToWelcome();
            } else {
              return redirectToNotFound();
            }
          } else if (per.isFound && !per.hasPermission) {
            return redirectToAccessDenied();
          } else {
            return redirectToPath();
          }
        }
      } else {
        return redirectToLogin();
      }
    }
  };

  return (
    <RouteGuardProvider
      routeChanger={navigate}
      pageLoader={Loading}
      advisorArgs={{ pathname, isLogin }}
      routeAdvisor={routeAdvisor}
    >
      {children}
    </RouteGuardProvider>
  );
}
