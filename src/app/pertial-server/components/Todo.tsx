export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<TodoItem[]> => {
  // Fetching data on the server
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "no-store", // Ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
