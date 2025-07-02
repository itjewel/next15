// Function return type	               infer R in return

/*  Step 1: Basic infer + Conditional Type */

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type A = GetReturnType<() => number>; // A = number
type B = GetReturnType<() => string>; // B = string
type C = GetReturnType<number>; // C = never
