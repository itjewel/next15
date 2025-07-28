"use client"; // Client Component ডিক্লেয়ার করুন

import { useState, useEffect } from "react";
import Tabs, { TabItem } from "./components/Tabs";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "overview";

  const [currentTab, setCurrentTab] = useState(tab);
  const [data, setData] = useState<unknown>(null);

  const tabs: TabItem[] = [
    { key: "overview", label: "Overview" },
    { key: "design", label: "Design" },
    { key: "development", label: "Development" },
    { key: "marketing", label: "Marketing" },
  ];

  useEffect(() => {
    setCurrentTab(tab);

    // Dynamic fetch — content agnostic!
    fetch(`/api/tab?tab=${tab}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log({ res });
      });
  }, [tab]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>

      <Tabs
        tabs={tabs}
        currentKey={currentTab}
        onTabChange={(key) => setCurrentTab(key)}
        content={<DynamicContent data={data} />}
        useQueryParam={true}
      />
    </div>
  );
}

function DynamicContent({ data }: { data: any }) {
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
}
