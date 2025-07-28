import { ClientTableAction } from "./client-table.action";
import { DefaultPageSize } from "./constant";

export const ClientTableReducer = (state, { action, payload }) => {
  switch (action) {
    case ClientTableAction.SetData: {
      return {
        ...state,
        data: payload?.data || [],
      };
    }
    case ClientTableAction.ChangeCurrentPage: {
      return {
        ...state,
        pageNumber: payload?.pageNumber || 1,
      };
    }
    case ClientTableAction.ChangeItemsPerPage: {
      return {
        ...state,
        itemsPerPage: payload?.itemsPerPage || DefaultPageSize,
        pageNumber: 1,
      };
    }
    case ClientTableAction.SetFilters: {
      return {
        ...state,
        filter: payload?.filter || {},
        pageNumber: 1,
      };
    }
  }
};
