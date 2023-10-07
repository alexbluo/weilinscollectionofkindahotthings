import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const data = await kv.lrange("data", 0, -1);
  console.log(data);

  return NextResponse.json({ data });
};

