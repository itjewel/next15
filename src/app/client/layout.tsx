import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function Page({ children }: Props) {
  return <div>{children}</div>;
}
