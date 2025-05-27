import { useEffect, useMemo, useState } from "react";
import { Table } from "./table.component";
import { useClientTableContext } from "./use-client-table-context.hook";

export const TableWrapper = () => {
  const ctx = useClientTableContext();
  const [tableData, setTableData] = useState([]);

  const {
    data: items,
    columns: cols,
    itemsPerPage,
    pageNumber,
    filter,
    errorText,
    filterCom: FilterComp,
    changeCurrentPage,
    changeItemsPerPage,
  } = ctx;

  const filteredData = useMemo(() => {
    if (!items?.length) return [];

    return items.filter((item) => {
      return Object.entries(filter || {}).every(([key, value]) => {
        if (value === "") return true;
        return item[key]?.toLowerCase()?.includes(value?.toLowerCase());
      });
    });
  }, [items, filter]);

  useEffect(() => {
    setTableData(filteredData);
  }, [filteredData]);

  return (
    <>
      {FilterComp}
      <Table
        columns={cols}
        tableData={tableData}
        handlePageChange={changeCurrentPage}
        handlePerRowsChange={changeItemsPerPage}
        itemsPerPage={itemsPerPage}
        pageNumber={pageNumber}
        errorText={errorText}
      />
    </>
  );
};
