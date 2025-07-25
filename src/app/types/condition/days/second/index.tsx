import { fetchProducts } from "../data";

type ExtractItemDataByType<T, ItemType extends string> = T extends () => [
  {
    data: {
      items: Array<infer Item>;
    };
  }
]
  ? Item extends { type: ItemType; data: infer D }
    ? D
    : never
  : never;

type ItemsProps = ExtractItemDataByType<
  typeof fetchProducts,
  "titleless_banner_offer"
>;

const result: ItemsProps = fetchProducts();
console.log(result);
