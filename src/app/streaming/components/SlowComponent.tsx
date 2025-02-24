async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <p className="text-green-500">✅ Slow Component Loaded!</p>;
}

export default SlowComponent;
