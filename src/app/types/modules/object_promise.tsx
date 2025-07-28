import { JSX } from "react";

interface Props {
  params: Promise<{
    id: string;
    name: string;
  }>;
  searhQuery: Promise<{
    tag: string;
  }>;
}

export default async function ObjectGenrics(
  props: Props
): Promise<JSX.Element> {
  const { id, name } = await props.params;
  return (
    <div>
      {id} {name}
      <p>T6pe checking</p>
    </div>
  );
}
