"use client";
import { useState } from "react";
import FancyComponent from "./components/fancy-component";

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <FancyComponent isFancy={true} />
      ) : (
        <FancyComponent isFancy={false} />
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
