import { fetchTodos } from "./Todo";

interface Props {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = async () => {
  const data = await fetchTodos();
  return (
    <ul>
      {data.map((value: Props) => (
        <li key={value.id}>
          <p>
            <strong>ID:</strong> {value.id}
          </p>
          <p>
            <strong>Title:</strong> {value.title}
          </p>
          <p>
            <strong>Completed:</strong> {value.completed ? "✅ Yes" : "❌ No"}
          </p>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
