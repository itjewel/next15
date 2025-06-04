function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Nizuel" },
  { id: 2, name: "May" },
];

const ids = pluck(users, "id"); // number[]
const names = pluck(users, "name"); // string[]
