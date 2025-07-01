type ReturnFuncType<T> = (...args: any[]) => T extends infer R ? R : ;
const foo = () => 2;

type Foo = ReturnFuncType<typeof foo>;
