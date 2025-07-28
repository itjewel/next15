interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function DynamicContent() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  const data: Todo = await res.json();

  return <p>Data: {data.title}</p>;
}
