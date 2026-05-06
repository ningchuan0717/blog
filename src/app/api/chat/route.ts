import { NextRequest } from "next/server";
import { getAccessPassword, getDeepSeekKey } from "@/lib/env";

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("auth_token")?.value;
  const password = getAccessPassword();
  if (!password) return new Response("Server not configured", { status: 500 });

  const encoder = new TextEncoder();
  const expectedToken = Array.from(encoder.encode(password + "_ningchuan"), (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");

  if (cookie !== expectedToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, thinkingMode } = await req.json();
  const apiKey = getDeepSeekKey();

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-pro",
      messages,
      thinking_mode: thinkingMode || "thinking_max",
      temperature: 1.0,
      top_p: 1.0,
      stream: true,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return new Response(err, { status: response.status });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
