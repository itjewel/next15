import { fetchProducts } from "../data";

type Items = ReturnType<typeof fetchProducts>[0]["data"]["items"];
