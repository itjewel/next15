import { ClientTableProvider } from "./client-table.provider";
import { TableWrapper } from "./table-wrapper.component";

export const ClientTable = ({
  columns = [],
  data = [],
  filterCom,
  errorText,
}) => {
  return (
    <ClientTableProvider
      columns={columns}
      data={data}
      filterCom={filterCom}
      errorText={errorText}
    >
      <TableWrapper />
    </ClientTableProvider>
  );
};
