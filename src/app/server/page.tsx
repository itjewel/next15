import { Suspense } from "react";
import DynamicContent from "./components/DynamicContent";
const Page = () => {
  return (
    <div>
      <h1>Header Section</h1>
      {/* Suspense for pertial loading */}
      <Suspense fallback={<p>Loading..</p>}>
        <DynamicContent />
      </Suspense>
      <h1>Footer Section</h1>
    </div>
  );
};

export default Page;
