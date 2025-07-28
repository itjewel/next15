"use client";

import { Suspense } from "react";
import { CuisinesSkeleton } from "./component/CuisinesSkeleton";
import Cuisines from "./component/Cuisines";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white py-10 px-4 color-[red]">
      <Suspense fallback={<CuisinesSkeleton />}>
        <h1 className="text-5xl font-bold text-blue-600">Hello world</h1>
        <Cuisines />
      </Suspense>
    </main>
  );
}
