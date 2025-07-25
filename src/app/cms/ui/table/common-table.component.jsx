import { getAllUrlParameters } from "@/helper";
import { isEqual } from "lodash";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { DataTable, HeaderWrapper } from "..";
import { useLazyGetTableListQuery } from "./common-table-api-slice";
import {
  changeCurrentPage,
  changeItemsPerPage,
  changePaginationParams,
  changeSortings,
} from "./common-table-slice";
import { TableActiveInactiveTab } from "./table-tabs.component";
import { ApiContext } from "@/contexts/api-context.component";

const InitialParams = {
  isActive: true,
  pageNumber: 1,
  itemsPerPage: 10,
  path: "",
};

const paginationRowsPerPageOptions = [10, 15, 25, 35, 50];

export function CommonTable({
  url,
  columns = [],
  filterComp: FilterComp,
  showActiveInactive = true,
  isDisablePagination = false,
  showIndex = false,
  selectableRows = false,
  tabComponent = <TableActiveInactiveTab />,
  handleSelectedRows,
}) {
  const {
    pageNumber,
    itemsPerPage,
    isActive,
    totalItems,
    filter,
    path,
    sortBy,
    sortOrder,
  } = useSelector((state) => state.commonTable);
  const { setApiData } = useContext(ApiContext);
  const dispatch = useDispatch();
  const [trigger, { data, isSuccess, isFetching, isError, error }] =
    useLazyGetTableListQuery();
  const { pathname } = useLocation();

  const formattedColumns = columns?.map((column) => {
    return {
      ...column,
      name: <HeaderWrapper>{column.name}</HeaderWrapper>,
      wrap: true,
    };
  });
  const columnsWithIndex = [
    {
      name: <HeaderWrapper>S.N</HeaderWrapper>,
      wrap: true,
      selector: (row, index) =>
        index + 1 + (itemsPerPage * pageNumber - itemsPerPage),
      width: "6rem",
    },
    ...formattedColumns,
  ];
  // Handle Sort For Datatable
  const handleSort = (column, sortDirection) => {
    dispatch(
      changeSortings({
        sortBy: column?.sortField || "updatedAt",
        sortOrder: sortDirection,
        pathname,
      })
    );
  };
  const allParams = getAllUrlParameters(url);
  const newUrl = url?.split("?")[0];

  if (
    url == "/riders/api/RiderShiftBooking/GetRiderShiftDetails" &&
    isSuccess
  ) {
    setApiData(data?.data);
  }

  useEffect(() => {
    if (pathname !== path) {
      dispatch(
        changePaginationParams({
          ...InitialParams,
          sortBy,
          sortOrder,
          path: pathname,
          filter: {},
        })
      );
    } else {
      if (url) {
        if (
          (Object.keys(allParams).length && newUrl) ||
          (Object.keys(filter).length && newUrl)
        ) {
          trigger({
            url: newUrl,
            params: {
              itemsPerPage,
              isActive,
              pageNumber,
              sortBy,
              sortOrder,
              ...filter,
              ...allParams,
            },
          });
        } else if (Object.keys(filter).length) {
          trigger({
            url,
            params: {
              itemsPerPage,
              isActive,
              pageNumber,
              sortBy,
              sortOrder,
              ...filter,
            },
          });
        } else {
          trigger({
            url,
            params: {
              pageNumber,
              itemsPerPage,
              isActive,
              sortBy,
              sortOrder,
            },
          });
        }
      }
    }
  }, [
    pageNumber,
    itemsPerPage,
    isActive,
    filter,
    pathname,
    path,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    if (data && isSuccess && data?.data?.items?.length > 0) {
      const paginationParams = {
        pageNumber: data?.data?.pageNumber,
        itemsPerPage: data?.data?.itemsPerPage,
        totalItems: data?.data?.totalItems,
      };

      if (!path) {
        paginationParams.path = pathname;
      } else {
        if (path !== pathname) {
          paginationParams.path = pathname;
        }
      }

      if (!isEqual({ pageNumber, itemsPerPage, isActive }, paginationParams)) {
        dispatch(changePaginationParams(paginationParams));
      }
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const items = isSuccess ? data?.data?.items || data?.data : [];
  return (
    <div className="my-1 common-table">
      {FilterComp && FilterComp}

      {showActiveInactive && tabComponent}

      <DataTable
        columns={showIndex ? columnsWithIndex : formattedColumns}
        tableData={items}
        handlePageChange={(pageNumber) => {
          dispatch(changeCurrentPage(pageNumber));
        }}
        handlePerRowsChange={(itemsPerPage) => {
          dispatch(changeItemsPerPage(itemsPerPage));
        }}
        progressPending={isFetching}
        totalRows={totalItems}
        paginationPerPage={itemsPerPage}
        currentPage={pageNumber}
        handleSort={handleSort}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        isDisablePagination={isDisablePagination}
        selectableRows={selectableRows}
        handleSelectedRows={handleSelectedRows}
        isShowTaps={showActiveInactive && tabComponent}
      />
    </div>
  );
}
