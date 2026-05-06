"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "./ChatProvider";
import { FiSend, FiTrash2, FiZap, FiLogOut } from "react-icons/fi";

const MODES = [
  { value: "thinking_max" as const, label: "Max", desc: "最强推理" },
  { value: "thinking" as const, label: "Think", desc: "深度思考" },
  { value: "non-thinking" as const, label: "Fast", desc: "快速回复" },
];

export default function ChatInput({ onLogout }: { onLogout: () => void }) {
  const [input, setInput] = useState("");
  const { sendMessage, isLoading, thinkingMode, setThinkingMode, clearMessages } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/10 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
            {MODES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setThinkingMode(value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  thinkingMode === value
                    ? "bg-primary-cyan/20 text-primary-cyan"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="flex items-center gap-1">
                  {value === "thinking_max" && <FiZap size={12} />}
                  {label}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={clearMessages}
            className="ml-auto p-2 rounded-lg text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-colors"
            title="清空对话"
          >
            <FiTrash2 size={14} />
          </button>
          <button
            onClick={onLogout}
            className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-white/5 transition-colors"
            title="退出登录"
          >
            <FiLogOut size={14} />
          </button>
        </div>

        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息... (Shift+Enter 换行)"
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm
                       placeholder-gray-600 focus:outline-none focus:border-primary-cyan/30
                       resize-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-purple
                       text-white font-medium disabled:opacity-30 transition-opacity
                       hover:opacity-90"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
