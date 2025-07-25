import { JSX } from "react";

// Define the shape of the params object
interface ParamShape {
  id: string;
  name: string;
}

// Define the shape of the search query object
interface SearchShape {
  t: string;
}

// Utility type to extract the resolved type of a Promise using infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : never;

// Define the props interface with generics
interface Props<
  TParams extends Promise<ParamShape>,
  TSearch extends Promise<SearchShape>
> {
  params: TParams; // Promise resolving to a ParamShape-compatible object
  searchQuery: TSearch; // Promise resolving to a SearchShape-compatible object
}

// Async functional component using generics
export default async function ObjectGenerics<
  TParams extends Promise<ParamShape>,
  TSearch extends Promise<SearchShape>
>(props: Props<TParams, TSearch>): Promise<JSX.Element> {
  // Await the promises to resolve their values
  const params = await props.params;
  const search = await props.searchQuery;

  // Use conditional types with infer to ensure type safety
  type ParamsType = UnwrapPromise<TParams>;
  type SearchType = UnwrapPromise<TSearch>;

  // Type assertions to ensure compatibility (safe due to generic constraints)
  const { id, name } = params as ParamsType extends ParamShape
    ? ParamsType
    : never;
  const { t: searchTerm } = search as SearchType extends SearchShape
    ? SearchType
    : never;

  // Render the JSX with the resolved values
  return (
    <div>
      <h1>
        ID: {id}, Name: {name}
      </h1>
      <p>Search Term: {searchTerm}</p>
      <p>Type checking with infer example</p>
    </div>
  );
}
