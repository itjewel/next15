export const createTodo = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    cache: "no-store",
  });

  const data = await res.json();
  return data;
  //   console.log("Response:", data);
};
