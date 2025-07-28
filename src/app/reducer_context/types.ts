export interface TaskLIstProps {
  id: number;
  text: string;
  done: boolean;
}

export type TaskAction =
  | { type: "changed"; task: TaskLIstProps }
  | { type: "deleted"; id: number }
  | { type: "added"; id: number; text: string };

export interface Dispatch {
  (action: TaskAction): void;
}
