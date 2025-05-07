import { Column } from "primereact/column";
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
  DataTableValueArray,
} from "primereact/datatable";
import { useDataTableContext } from "./use-datatable-context.hook";
import { useRouter } from "next/router";
import { GetSavedFilter } from "herlper/filter";
import {
  FilterFormValue,
  TransformedColumn,
} from "features/ticket/ticket-types";
import { FilterFormInitialValue } from "features/ticket/constants";

export function Table() {
  const context = useDataTableContext();
  const showRowSelect = context?.settings?.showRowSelect;
  const columns = context?.settings?.columns;
  const params = context?.settings?.params;

  /* dynamic field start */

  const { pathname } = useRouter();

  // Destructure RequestedColumns from GetSavedFilter
  const { RequestedColumns } = GetSavedFilter<FilterFormValue>(
    pathname,
    FilterFormInitialValue
  );
  // console.log({ RequestedColumns }, "jewel");

  // Transform RequestedColumns, handling undefined
  const transformedColumns: TransformedColumn[] = RequestedColumns?.length
    ? RequestedColumns.map((column) => {
        const field =
          column.value.charAt(0).toLowerCase() + column.value.slice(1);

        const transformed: TransformedColumn = {
          field,
          header: column.label,
        };

        // Add className for specific fields
        if (field === "predefinedReasonName") {
          transformed.className = "large-text-style";
        }

        return transformed;
      })
    : [];

  // Log the transformed columns for verification
  const lastColumn = columns[columns.length - 1];
  const customColumns = [
    { field: "ticketNumber", header: "Ticket number" },
    { field: "accountNumber", header: "Account number" },
    ...transformedColumns,
    lastColumn, // ✅ just include the object directly
  ];

  let tableData = columns;
  // if (RequestedColumns) {
  //   tableData = customColumns;
  // }

  console.log({ columns, transformedColumns });

  return (
    <DataTable
      {...context?.props}
      className={`datatable ${context?.props?.className || ""}`}
      loading={context?.settings?.isLoading}
      sortField={params?.sortBy || ""}
      sortOrder={params?.sortOrder === "asc" ? 1 : -1}
      removableSort
      onSort={(event) => {
        context.onSortChange({
          sortBy: event.sortField,
          sortOrder: event.sortOrder === 1 ? "asc" : "desc",
        });
      }}
      selectionMode={showRowSelect ? "multiple" : null}
      selection={(context?.settings?.selectedRows || []) as DataTableValueArray}
      onSelectionChange={(
        event: DataTableSelectionMultipleChangeEvent<DataTableValueArray>
      ) => {
        context?.onSelectedRowsChange(event.value);
      }}
      scrollable
      scrollHeight={`calc(-309px + 100vh)`}
    >
      {showRowSelect && (
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
      )}

      {tableData.map((column, index) => (
        <Column {...column} key={index} />
      ))}
    </DataTable>
  );
}
