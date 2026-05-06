"use client";

import { useChat } from "./ChatProvider";
import { FiUser, FiCpu } from "react-icons/fi";

export default function ChatMessages() {
  const { messages, isLoading } = useChat();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-cyan to-primary-purple flex items-center justify-center text-2xl">
            <FiCpu />
          </div>
          <h2 className="text-xl font-semibold mb-2">DeepSeek V4 Pro Max</h2>
          <p className="text-gray-500 text-sm">1M 上下文 · 最强推理 · 随时提问</p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
        >
          {msg.role === "assistant" && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-cyan to-primary-purple flex items-center justify-center shrink-0 mt-1">
              <FiCpu size={14} />
            </div>
          )}
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "bg-gradient-to-r from-primary-cyan to-primary-purple text-white"
                : "bg-white/5 border border-white/10"
            }`}
          >
            {msg.reasoning && (
              <details className="mb-2">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                  推理过程
                </summary>
                <div className="mt-2 p-3 rounded-lg bg-black/20 text-xs text-gray-400 whitespace-pre-wrap border-l-2 border-primary-cyan/30">
                  {msg.reasoning}
                </div>
              </details>
            )}
            {msg.content ? (
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            ) : msg.role === "assistant" && isLoading ? (
              <div className="flex gap-1.5 py-1">
                <span className="w-2 h-2 rounded-full bg-primary-cyan animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 rounded-full bg-primary-cyan animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 rounded-full bg-primary-cyan animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            ) : null}
          </div>
          {msg.role === "user" && (
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-1">
              <FiUser size={14} />
            </div>
          )}
        </div>
      ))}

      <div ref={(el) => el?.scrollIntoView({ behavior: "smooth" })} />
    </div>
  );
}
