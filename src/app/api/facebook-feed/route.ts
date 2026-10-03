import { NextResponse } from "next/server";
import { getFacebookFeed } from "@/lib/facebook-feed";
export async function GET() {
  const result = await getFacebookFeed();
  return NextResponse.json({ status: result.status, data: result.posts }, {
    status: result.status === "unavailable" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
