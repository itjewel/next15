import { JSX } from "react";

interface Props<T> {
  params: Promise<{
    id: T;
    name: T;
  }>;
  searhQuery: Promise<{
    tag: T;
  }>;
}

export default async function ObjectGenrics<T extends string | number>(
  props: Props<T>
): Promise<JSX.Element> {
  const { id, name } = await props.params;
  return (
    <div>
      {id} {name}
      <p>T6pe checking</p>
    </div>
  );
}
