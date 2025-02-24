async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });
  return res.json();
}

export default async function DataComponent() {
  const data = await getData();
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded">
      <h2 className="font-semibold">Fetched Data:</h2>
      <pre className="bg-gray-100 p-2">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
