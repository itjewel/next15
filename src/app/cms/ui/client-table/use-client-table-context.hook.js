import { useContext } from "react";
import { ClientTableContext } from "./client-table.context.provider";
import { ClientTableAction } from "./client-table.action";

export const useClientTableContext = () => {
  const { dispatch, ...rest } = useContext(ClientTableContext);

  const changeCurrentPage = (e) => {
    dispatch?.({
      action: ClientTableAction?.ChangeCurrentPage,
      payload: {
        ...rest,
        pageNumber: e,
      },
    });
  };

  const changeItemsPerPage = (e) => {
    dispatch?.({
      action: ClientTableAction.ChangeItemsPerPage,
      payload: {
        ...rest,
        itemsPerPage: e,
      },
    });
  };

  const setFilters = (filter) => {
    dispatch?.({
      action: ClientTableAction.SetFilters,
      payload: {
        ...rest,
        filter: filter,
      },
    });
  };

  return {
    ...rest,
    changeCurrentPage,
    changeItemsPerPage,
    setFilters,
  };
};
