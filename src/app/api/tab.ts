import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") || "overview";

  const mockData = {
    overview: { title: "Overview", description: "We do great work!" },
    design: { title: "Design", description: "Design your dreams." },
    development: { title: "Development", description: "We build software." },
    marketing: { title: "Marketing", description: "Grow your audience." },
  };

  return NextResponse.json(mockData[tab] || mockData.overview);
}
