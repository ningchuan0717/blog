"use client";

import { useState } from "react";
import { FiLock, FiArrowRight, FiShield } from "react-icons/fi";

export default function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "验证失败");
      }
    } catch {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-cyan to-primary-purple flex items-center justify-center">
            <FiShield size={28} />
          </div>
          <h1 className="text-2xl font-bold mb-2">柠川 AI</h1>
          <p className="text-gray-500 text-sm">DeepSeek V4 Pro Max · 私人助手</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入访问密码"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3
                         text-sm focus:outline-none focus:border-primary-cyan/30 placeholder-gray-600"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-purple
                       text-white font-medium disabled:opacity-30 transition-opacity
                       flex items-center justify-center gap-2"
          >
            {loading ? "验证中..." : "进入"}
            {!loading && <FiArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
