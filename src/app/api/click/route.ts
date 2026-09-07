import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "id가 필요합니다" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("linknamu");

  await db
    .collection("linkClicks")
    .updateOne({ linkId: id }, { $inc: { count: 1 } }, { upsert: true });

  return NextResponse.json({ ok: true });
}
