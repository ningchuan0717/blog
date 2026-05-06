import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correctPassword = process.env.ACCESS_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  if (password !== correctPassword) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }

  const encoder = new TextEncoder();
  const hash = Array.from(encoder.encode(password + "_ningchuan"), (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");

  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", hash, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return response;
}
