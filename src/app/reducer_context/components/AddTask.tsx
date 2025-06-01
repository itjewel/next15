"use client";
import { useState } from "react";
import { useTasksDispatch } from "./TasksProvider";
type TaskAction<T> = {
  type: "added";
  id: number;
  text: string;
  data?: T;
};
type TaskDispatch<T> = (action: TaskAction<T>) => void;
export default function AddTask<T, D extends TaskDispatch<T>>() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch() as D | null;
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          dispatch!({
            type: "added",
            id: nextId++,
            text: text,
          });
        }}
      >
        Add
      </button>
    </>
  );
}

let nextId = 3;
