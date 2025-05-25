export interface TaskProps {
  id: number;
  text: string;
  done: boolean;
}

export interface Dispatch {
  action: () => void;
}
