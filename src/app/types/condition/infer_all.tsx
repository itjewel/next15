// Pattern	                               Example Type
// Function return type	               infer R in return
// Function arguments	                   infer A in args
// Tuple elements	                       infer A in tuple
// Array elements	                       T extends (infer E)[]
// Object properties	                   T extends { prop: infer P }
// Nested object	                       T extends { a: { b: infer V } }
// Discriminated union extractor	       type based payload infer
// Multi conditional dynamic match        T extends A ? ... : B ? ...
// Keys by value type (mapped)         	K in keyof T with extends

/*  Step 1: Basic infer + Conditional Type */

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type A = GetReturnType<() => number>; // A = number
type B = GetReturnType<() => string>; // B = string
type C = GetReturnType<number>; // C = never
/*  
ব্যাখ্যা:
1) T যদি একটা ফাংশন টাইপ হয়: (...args) => returnType
2) তাহলে infer R দ্বারা আমরা সেই return টাইপ R বের করি
3) না হলে never


 যদি T কোনো ফাংশন হয়, তাহলে তার রিটার্ন টাইপ বের করবে।

infer R দিয়ে টাইপ বের করে নিচ্ছে। */

/*  ✅ Step 2: Infer Parameter Type */
type GetFirstArg<T> = T extends (arg1: infer A, ...args: any) => any
  ? A
  : never;

type X = GetFirstArg<(a: string, b: number) => void>; // X = string

/*
1) যদি T ফাংশন হয়, তাহলে প্রথম আর্গুমেন্টের টাইপ A বের করো

2) না হলে never
*/

/* ✅ Step 3: Infer Tuple Elements */
type GetFirstFromTuple<T> = T extends [infer A, ...any[]] ? A : never;

type F1 = GetFirstFromTuple<[string, number, boolean]>; // F1 = string

type GetLastFromTuple<T> = T extends [...any[], infer Last] ? Last : never;

type F2 = GetLastFromTuple<[string, number, boolean]>; // F2 = boolean
/*
ব্যাখ্যা:
1) যদি T হয় string[], তাহলে infer U = string
2) তাহলে output হবে string
*/

/* ✅ Step 4: Infer Object Properties */
type GetPropType<T> = T extends { name: infer P } ? P : never;

type Obj = { name: string; age: number };
type P1 = GetPropType<Obj>; // P1 = string

/* ✅ Step 5: Multiple infer in same type */
type ExtractFnDetails<T> = T extends (a: infer A, b: infer B) => infer R
  ? { args: [A, B]; return: R }
  : never;

type F = ExtractFnDetails<(x: number, y: string) => boolean>;
// F = { args: [number, string]; return: boolean }

/* ✅ Step 6: Nested Infer */
type DeepValue<T> = T extends { data: { value: infer V } } ? V : never;

type Example = { data: { value: number } };
type Result = DeepValue<Example>; // Result = number

/* ✅ Step 7: Infer Array Element Type */

type ElementType<T> = T extends (infer U)[] ? U : never;

type Arr = ElementType<string[]>; // Arr = string
type Arr2 = ElementType<number[]>; // Arr2 = number

/* ✅ Step 8: Dynamic Discriminated Union Infer */
type Action =
  | { type: "add"; payload: number }
  | { type: "delete"; payload: string };

type ExtractPayload<T, Type extends string> = T extends {
  type: Type;
  payload: infer P;
}
  ? P
  : never;

type AddPayload = ExtractPayload<Action, "add">; // AddPayload = number
type DeletePayload = ExtractPayload<Action, "delete">; // DeletePayload = string

/* ✅ Step 9: Multi-condition with fallback */

type SmartType<T> = T extends string
  ? "StringType"
  : T extends number
  ? "NumberType"
  : T extends boolean
  ? "BooleanType"
  : T extends Array<infer U>
  ? `Array of ${U & string}`
  : "UnknownType";

type T1 = SmartType<string>; // "StringType"
type T2 = SmartType<number>; // "NumberType"
type T3 = SmartType<boolean[]>; // "Array of boolean"
type T4 = SmartType<{}>; // "UnknownType"

/* ✅ Step 10: Utility-style infer with generic pick */

type PickType<T, K extends keyof T> = T[K] extends infer R ? R : never;

type User = { name: string; age: number };
type NameType = PickType<User, "name">; // string
type AgeType = PickType<User, "age">; // number

/* ✅ Step 11: Function Argument & Return Dynamic Extractor */
type FnMeta<T> = T extends (...args: infer A) => infer R
  ? { args: A; return: R }
  : never;

type Fn = (id: string, flag: boolean) => number;

type Meta = FnMeta<Fn>;
// Meta = { args: [string, boolean]; return: number }

/* ✅ Step 12: Conditional Key Extractor (Dynamic) */
type KeysWithType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type Example = {
  name: string;
  age: number;
  active: boolean;
};

type StringKeys = KeysWithType<Example, string>; // "name"
type BooleanKeys = KeysWithType<Example, boolean>; // "active"
