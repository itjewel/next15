import { createContext } from "react";
import { DefaultPageSize } from "./constant";

export const ClientTableContext = createContext({
  data: [],
  columns: [],
  itemsPerPage: DefaultPageSize,
  pageNumber: 1,
  filter: {},
  filterCom: <></>,
  errorText: "",
});
