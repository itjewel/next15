// components/Tabs.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  currentKey: string;
  onTabChange: (key: string) => void;
  content: React.ReactNode;
  useQueryParam?: boolean;
}

export default function Tabs({
  tabs,
  currentKey,
  onTabChange,
  content,
  useQueryParam,
}: TabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (key: string) => {
      onTabChange(key);
      if (useQueryParam) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", key);
        router.push(`?${params.toString()}`);
      }
    },
    [onTabChange, router, searchParams, useQueryParam]
  );

  return (
    <div>
      <div className="flex border-b space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleChange(tab.key)}
            className={`px-4 py-2 ${
              currentKey === tab.key
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{content}</div>
    </div>
  );
}
