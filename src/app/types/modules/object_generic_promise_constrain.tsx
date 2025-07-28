import { JSX } from "react";

interface ParamShape {
  id: string;
  name: string;
}
interface SearchShape {
  t: string;
}
interface Props<Tparams, Tsearching> {
  params: Promise<Tparams>;
  searhQuery: Promise<Tsearching>;
}

export default async function ObjectGenrics<
  Tp extends ParamShape,
  Ts extends SearchShape
>(props: Props<Tp, Ts>): Promise<JSX.Element> {
  const { id, name } = await props.params;
  return (
    <div>
      {id} {name}
      <p>T6pe checking</p>
    </div>
  );
}
