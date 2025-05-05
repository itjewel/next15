'use client';
import { useWindowSize } from "./components/useDebugValue.component";

export default function Page() {
  const windowSize = useWindowSize(); // Call the Hook

  return (
    <div>
      <h1>Window Size</h1>
      
    </div>
  );
}