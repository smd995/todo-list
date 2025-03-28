import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  console.log(baseUrl);
  console.log(apiKey);

  if (!baseUrl || !apiKey) {
    return NextResponse.json({ error: "환경변수 누락" }, { status: 500 });
  }

  const res = await fetch(baseUrl + `/${apiKey}`);
  const data = await res.json();
  return NextResponse.json(data);
}
