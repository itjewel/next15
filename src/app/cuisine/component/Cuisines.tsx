// app/cuisines/Cuisines.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/features/ui/shadcn/carousel";

import { useEffect, useState } from "react";

export default function Cuisines() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(["Pizza", "Burger", "Pasta", "Sushi", "Curry"]);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return null;

  return (
    <section className="container mx-auto my-5">
      <Carousel className="w-full py-5" opts={{ align: "start" }}>
        <div className="relative mb-5 flex items-center justify-between">
          <h4 className="text-2xl font-semibold">Cuisines</h4>
        </div>
        <CarouselContent className="pt-8">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="h-[200px] w-[200px] rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-700">
                  {item}
                </div>
                <div className="text-sm font-medium">{item}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
