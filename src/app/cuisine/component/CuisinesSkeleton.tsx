// app/components/CuisinesSkeleton.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/features/ui/shadcn/carousel";

import { Skeleton } from "@/features/ui/shadcn/skeleton";

export function CuisinesSkeleton() {
  return (
    <section className="container mx-auto my-5 min-h-[260px]">
      <Carousel className="w-full py-5" opts={{ align: "start" }}>
        <div className="relative mb-5 flex items-center justify-between">
          <h4 className="text-2xl font-semibold">Cuisines</h4>
        </div>

        <CarouselContent className="pt-8">
          {[...Array(5)].map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
                  <Skeleton className="h-full w-full rounded-xl bg-slate-100" />
                </div>
                <Skeleton className="h-4 w-24 rounded bg-slate-100" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
