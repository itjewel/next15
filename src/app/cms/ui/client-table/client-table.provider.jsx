import { ClientTableContext } from "./client-table.context.provider";
import { useClientTable } from "./use-client-table.hook";

export const ClientTableProvider = (props) => {
  const context = useClientTable(props);

  return (
    <ClientTableContext.Provider value={context}>
      {props.children}
    </ClientTableContext.Provider>
  );
};
