import { Suspense } from "react";
import TodoList from "./components/TodoList";

const Page = async () => {
  return (
    <div>
      <h2>Todo List</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <TodoList />
      </Suspense>
    </div>
  );
};

export default Page;
