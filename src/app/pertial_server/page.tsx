import { fetchTodos } from "./components/Todo";
interface Props {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const Page = async () => {
  const data = await fetchTodos();

  return (
    <div>
      <h2>Todo List</h2>
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
    </div>
  );
};

export default Page;
