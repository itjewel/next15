// app/page.tsx
"use client";

import { Suspense } from "react";
import { CuisinesSkeleton } from "./component/CuisinesSkeleton";
import Cuisines from "./component/Cuisines";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <Suspense fallback={<CuisinesSkeleton />}>
        <Cuisines />
      </Suspense>
    </main>
  );
}
