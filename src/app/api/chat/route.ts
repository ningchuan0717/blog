import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, thinkingMode } = await req.json();

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
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
