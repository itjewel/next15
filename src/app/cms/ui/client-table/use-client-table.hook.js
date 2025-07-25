import { useEffect, useReducer } from "react";
import { InitialParams } from "./constant";
import { ClientTableReducer } from "./client-table.reducer";
import { ClientTableAction } from "./client-table.action";

export const useClientTable = (props) => {
  const initArgs = {
    ...props,
    data: props?.data || [],
    ...InitialParams,
  };
  const [state, dispatch] = useReducer(ClientTableReducer, initArgs);

  useEffect(() => {
    if (props?.data?.length) {
      dispatch?.({
        action: ClientTableAction?.SetData,
        payload: {
          ...state,
          data: props?.data,
        },
      });
    } else {
      dispatch?.({
        action: ClientTableAction?.SetData,
        payload: {
          ...state,
          data: [],
        },
      });
    }
  }, [props?.data]);

  return { ...state, dispatch };
};
