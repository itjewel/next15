"use client";
import { useState } from "react";
import { useTasksDispatch } from "./TasksProvider";
// import { Dispatch } from "../types";
type TaskAction<T> = {
  type: "added";
  id: number;
  text: string;
  data?: T; // Optional generic data field for flexibility
};
// import { Dispatch } from "../types";
type TaskDispatch<T> = (action: TaskAction<T>) => void;
export default function AddTask<T, D extends TaskDispatch<T>>() {
  const [text, setText] = useState<string>("");
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
          dispatch({
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
