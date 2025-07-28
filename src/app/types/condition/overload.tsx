function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

createLabel("typescript");

//   let a: NameLabel

createLabel(2.8);

//   let b: IdLabel

createLabel(Math.random() ? "hello" : 42);
//   let c: NameLabel | IdLabel
