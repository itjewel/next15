import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function walkMenu(self, acc) {
  let parent = acc || { path: "", urls: [], displayNames: [] };
  parent.path = parent.path + (self.url || "");
  parent.urls.push(self.url || "/");
  parent.displayNames.push(self.displayName || "");
  const rv = [parent];
  if (self.hasSubMenus && self.subMenus?.length > 0) {
    self.subMenus.forEach((sm) => {
      const subMenus = walkMenu(sm, {
        path: parent.path,
        urls: [...parent.urls],
        displayNames: [...parent.displayNames],
      });
      rv.push(...subMenus);
    });
  }
  return rv;
}

function flattenMenus(menu) {
  let rv = [];
  menu?.forEach((m) => {
    const menus = walkMenu(m);
    rv = [...rv, ...menus];
  });
  return rv;
}

export const FoodiBreadcrumb = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.userCredential);

  const flatMenus = useMemo(() => {
    return flattenMenus(menu);
  }, [menu]);

  const found = useMemo(() => {
    return flatMenus?.find((m) => m.path === pathname);
  }, [flatMenus, pathname]);

  if (!found) {
    return <></>;
  }

  const bItems = [
    {
      name: "",
      icon: <AiTwotoneHome className="text-primary" />,
      url: "/",
    },
  ];

  for (let i = 0; i < found.urls.length; i++) {
    bItems.push({
      name: found.displayNames[i],
      url: found.urls[i],
    });
  }

  return (
    <div className="pb-1 d-flex align-items-center column-gap-2 layout-breadcrumb">
      {bItems.map((item, index) => {
        let isLink = false;
        if (item?.url) {
          if (bItems.length - 1 !== index) {
            isLink = true;
          }
        } else {
          isLink = false;
        }

        return (
          <React.Fragment key={index}>
            <div>
              {Boolean(item.icon) && (
                <span style={{ display: "block", marginTop: "-0.2rem" }}>
                  {!item.name ? (
                    <Link to={item.url}>{item?.icon}</Link>
                  ) : (
                    item?.icon
                  )}
                </span>
              )}
              {Boolean(item.name) && (
                <span className={`mt-1`}>
                  {isLink ? (
                    <Link
                      className="text-primary text-decoration-none"
                      to={item.url}
                      data-cy={index + 1 === bItems.length ? 0 : ""}
                    >
                      {item?.name}
                    </Link>
                  ) : (
                    <span className={`pt-1 text-muted`}>{item?.name}</span>
                  )}
                </span>
              )}
            </div>

            {bItems.length - 1 !== index && (
              <span className="text-primary">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

FoodiBreadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  active: PropTypes.string,
};
