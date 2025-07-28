"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { TaskAction, TaskLIstProps } from "../types";

const TasksContext = createContext<TaskLIstProps[] | null>(null);

const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(
  null
);

interface TaskProviderProps {
  children: ReactNode;
}

export function TasksProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: TaskLIstProps[], action: TaskAction) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t: TaskLIstProps) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t: TaskLIstProps) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: ");
    }
  }
}

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
