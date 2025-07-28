import { isArray } from "lodash";
import Select from "react-select";
import { useLazyAutoComplete } from "..";

/**
 * @typedef {Object} OtherProps
 * @property {string} url
 * @property { Object } params
 * @property { boolean } error
 * @property { number | string } disableOption
 * @property { { id: string, names: string[] } } customLabels
 *
 */

/**
 * @typedef {OtherProps & import ('react-select').Props} AutoCompleteProps
 */

/**
 *
 * @param { AutoCompleteProps } props
 */
export const AutoCompleteAsync = ({
  url,
  params = {},
  id,
  name,
  borderRadius = "5px",
  fontSize = "1rem",
  error,
  styles,
  initialOptions = [],
  ...rest
}) => {
  // NOTE: If pass initialOptions then it will be used as the default options and visable always top level.
  // Same behavior with filter options

  const { options, isLoading, handleFilterChange, fetchMoreData } =
    useLazyAutoComplete(url, params, rest?.customLabels ?? undefined);

  const filterOption = (op, searchText) => {
    // First check if exist in the initial options then skip filter
    if (isArray(initialOptions) && initialOptions?.length > 0) {
      return true;
    }
    const searchTextLower = searchText?.toLowerCase();
    const dataValues = Object.keys(op?.data)
      .filter((key) => key !== "label" && key !== "value") //exclude lable and value
      .map((key) => op?.data[key]);

    return dataValues.some((value) => {
      if (value && typeof value === "string") {
        return value?.toLowerCase()?.includes(searchTextLower);
      }
      return false;
    });
  };

  return (
    <Select
      menuPortalTarget={document.body}
      id={id}
      name={name}
      className="fd-select2"
      options={[...initialOptions, ...options] || []}
      isLoading={isLoading}
      onMenuScrollToBottom={fetchMoreData}
      onInputChange={handleFilterChange}
      filterOption={filterOption}
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
  );
};
