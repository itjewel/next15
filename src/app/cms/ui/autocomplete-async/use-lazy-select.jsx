import { modifyFilterObj } from "@/helper";
import _, { isEqual, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { usePrevious } from "react-use";
import { useLazyGet } from "../../api";

const initialParams = {
  itemsPerPage: 10,
  pageNumber: 1,
  search: "",
  isActive: true,
};

function hasArrayInObject(paramObj) {
  return Object.values(paramObj).some((value) => Array.isArray(value));
}

export const useLazyAutoComplete = (url, paramObj, customLabels) => {
  const [params, setParams] = useState({ ...initialParams, ...paramObj });
  const [options, setOptions] = useState([]);
  const [fetchMore, setFetchMore] = useState(false);
  const prevParamObj = usePrevious(paramObj);
  const prevParams = usePrevious(params);

  const { trigger, data, isLoading, error } = useLazyGet(
    url,
    modifyFilterObj(params),
    hasArrayInObject(params)
      ? {
          paramsSerializer: {
            indexes: null,
          },
        }
      : {}
  );

  const fetchMoreData = () => {
    if (params?.pageNumber < data?.data?.totalPages) {
      setFetchMore(true);
      setParams((prev) => ({ ...prev, pageNumber: prev?.pageNumber + 1 }));
    } else {
      setFetchMore(false);
    }
  };

  const handleFilterChange = _.debounce((key) => {
    const resetPageNumber = key !== "" || params?.search !== "";
    const clearOptions = key === "" && params?.search !== "";
    setParams((prev) => ({
      ...prev,
      pageNumber:
        (resetPageNumber && initialParams?.pageNumber) || prev?.pageNumber,
      search: key?.trim(),
    }));
    if (clearOptions) {
      setOptions([]);
    }
  }, 500);

  useEffect(() => {
    if (!isEqual(prevParams, params) && url) {
      trigger();
    }
  }, [params, prevParams, url]);

  useEffect(() => {
    // if data is null
    if (!isLoading && data?.data === null) {
      setOptions([]);
    }

    const getLabels = (item, names) => {
      if (names?.length) {
        for (let name of names) {
          if (item[name]) return item[name];
        }
        return `Not found for ${names.join("|")}`;
      }

      return item?.["name"];
    };

    if (!isLoading && data?.data?.items?.length > 0) {
      const transformOptions = data?.data?.items?.map((item) => {
        return {
          label: getLabels(item, customLabels?.names),
          value: item?.[customLabels ? customLabels?.id : "id"],
          ...item,
        };
      });
      setOptions((prevOptions) =>
        uniqBy(
          [...(fetchMore ? prevOptions : []), ...transformOptions],
          "value"
        )
      );
    }

    if (!isLoading && data?.data?.items?.length === 0) {
      setOptions(() => []);
    }
  }, [isLoading, data?.data]);

  useEffect(() => {
    if (!isLoading && error) {
      setOptions(() => []);
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (paramObj && !isEqual(prevParamObj, paramObj) && url) {
      setOptions(() => []);
      setParams((prev) => ({
        ...prev,
        ...paramObj,
        pageNumber: initialParams.pageNumber,
      }));
    }
  }, [paramObj, prevParamObj, url]);

  return {
    options,
    isLoading,
    handleFilterChange,
    fetchMoreData,
  };
};
