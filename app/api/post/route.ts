import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { item } = await req.json();

  await kv.lpush("data", item);
  const data = await kv.lrange("data", 0, -1);

  return NextResponse.json({ data });
};
