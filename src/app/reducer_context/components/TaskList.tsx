"use client";
import { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksProvider";
import { Dispatch, TaskLIstProps } from "../types";

export default function TaskList() {
  const tasks = useTasks() as TaskLIstProps[] | null;
  if (!tasks) {
    return <p>No tasks available</p>;
  }
  return (
    <ul>
      {tasks.map((task: TaskLIstProps) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }: { task: TaskLIstProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch() as Dispatch | null;
  if (!dispatch) {
    console.error("Dispatch not available.");
    return null;
  }
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}
