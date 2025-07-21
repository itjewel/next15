import { fetchProducts } from "../data";
type GetFirstFromTuple<T> = T extends [infer A, ...any[]] ? A : never;

type F1 = GetFirstFromTuple<[string, number, boolean]>; // F1 = string

type GetLastFromTuple<T> = T extends [...any[], infer Last] ? Last : never;

type F2 = GetLastFromTuple<[string, number, boolean]>; // F2 = boolean
