function mapp<TI, TO>(arg: TI[], func: (a: TI) => TO): TO[] {
  return arg.map(func);
}
const parsed = mapp(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);
