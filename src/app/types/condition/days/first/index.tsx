function fetchProducts() {
  return [
    { id: 1, name: "Apple", price: 100, age: 45 },
    { id: 2, name: "Banana", price: 50 },
  ];
}

type GetGeneric<T> = T extends (...args: unknown[]) => infer R ? R : never;

type ReturnTypee = GetGeneric<typeof fetchProducts>;

const result: ReturnTypee = fetchProducts();

console.log(result);
