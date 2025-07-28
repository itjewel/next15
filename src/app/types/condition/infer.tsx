type GetReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

// Usage:
type Result = GetReturnType<() => string>; // number

export default async function Infer() {
  return <div>Hello</div>;
}
