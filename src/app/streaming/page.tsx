import { Suspense } from "react";
import SlowComponent from "./components/SlowComponent";
import DataComponent from "./components/DataComponent";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Next.js Streaming Example</h1>

      {/* Slow Component loads separately */}
      <Suspense
        fallback={<p className="text-gray-500">Loading slow content...</p>}
      >
        <SlowComponent />
      </Suspense>

      {/* Streaming data fetch */}
      <Suspense fallback={<p className="text-blue-500">Fetching data...</p>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}
