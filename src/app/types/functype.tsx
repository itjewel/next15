type ReturnFuncType<T> = (...args: any[]) => T extends infer R ? R : ;
const foo = () => 2;

type Foo = ReturnFuncType<typeof foo>;

type jewel = number;
const realValue:jewel = 12
const kamal= realValue as unknown as string
