import { JSX } from "react";

// Utility to extract return type from a function
type ReturnTypeOf<T> = T extends (...args: unknown[]) => infer R ? R : never;

// Example functional type
// type MyFunc = () => JSX.Element;

export default async function FunctionType<T extends () => JSX.Element>(
  props: ReturnTypeOf<T> // যা এখানে JSX.Element হবে
): Promise<ReturnTypeOf<T>> {
  return props;
}

// const MyComponent = () => <div>Hello World</div>;

// const result = await FunctionType(MyComponent());
