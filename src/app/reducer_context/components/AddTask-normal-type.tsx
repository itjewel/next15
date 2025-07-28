"use client";
import { useState } from "react";
import { useTasksDispatch } from "./TasksProvider";
// import { Dispatch } from "../types";
import { Dispatch } from "../types";

export default function AddTask() {
  const [text, setText] = useState<string>("");
  const dispatch = useTasksDispatch() as Dispatch | null;
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
