import { useLayoutEffect, useRef, useState } from "react";
const fixHeight = 48;
export const useDatatableHeightAdjust = () => {
  const layoutRef = useRef(null);
  const [height, setHeight] = useState({
    navbarHeight: 0,
    breadcrumbHeight: 0,
    layoutTitleHeight: 0,
    filterHeight: 0,
  });

  const getElementHeightWithMargin = (element) => {
    const margin =
      parseInt(
        window.getComputedStyle(element).getPropertyValue("margin-top")
      ) +
      parseInt(
        window.getComputedStyle(element).getPropertyValue("margin-bottom")
      );
    return element?.offsetHeight + margin || 0;
  };

  useLayoutEffect(() => {
    const navbarClass = document.querySelector(".navbar");
    const breadcrumbClass =
      layoutRef?.current?.querySelector(".layout-breadcrumb");
    const layoutTitleClass = layoutRef?.current?.querySelector(".layout-title");
    const filterClass = layoutRef?.current?.querySelector(".dt-filter");

    setHeight({
      navbarHeight: getElementHeightWithMargin(navbarClass),
      breadcrumbHeight: getElementHeightWithMargin(breadcrumbClass),
      layoutTitleHeight: getElementHeightWithMargin(layoutTitleClass),
      filterHeight: getElementHeightWithMargin(filterClass),
    });

    const dataTableClass = layoutRef?.current?.querySelector(".rc-data-table");
    if (dataTableClass) {
      const calculatedHeight = `calc(100vh - ${
        height.navbarHeight +
        height.breadcrumbHeight +
        height.layoutTitleHeight +
        height.filterHeight +
        fixHeight
      }px)`;

      dataTableClass.style.maxHeight = calculatedHeight;
      dataTableClass.style.overflow = "auto";
    }
  }, [layoutRef?.current]);

  return { layoutRef };
};
