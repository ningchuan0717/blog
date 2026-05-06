"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
  timestamp: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  thinkingMode: "thinking_max" | "thinking" | "non-thinking";
  setThinkingMode: (mode: "thinking_max" | "thinking" | "non-thinking") => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: async () => {},
  isLoading: false,
  thinkingMode: "thinking_max",
  setThinkingMode: () => {},
  clearMessages: () => {},
});

export function useChat() {
  return useContext(ChatContext);
}

export default function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingMode, setThinkingMode] = useState<"thinking_max" | "thinking" | "non-thinking">("thinking_max");

  const clearMessages = useCallback(() => setMessages([]), []);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      reasoning: "",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const allMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages, thinkingMode }),
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: `Error: ${err}` }
              : m
          )
        );
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            const reasoningContent = delta?.reasoning_content || "";
            const textContent = delta?.content || "";

            if (reasoningContent || textContent) {
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== assistantId) return m;
                  return {
                    ...m,
                    reasoning: m.reasoning + reasoningContent,
                    content: m.content + textContent,
                  };
                })
              );
            }
          } catch {
            // skip incomplete chunks
          }
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `网络错误: ${err}` }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, thinkingMode]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, thinkingMode, setThinkingMode, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}
