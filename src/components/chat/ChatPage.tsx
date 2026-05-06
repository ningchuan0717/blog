"use client";

import { useState, useEffect, useCallback } from "react";
import ChatProvider from "./ChatProvider";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import LoginGate from "./LoginGate";

export default function ChatPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth_verified");
    if (auth === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("auth_verified", "true");
    setAuthenticated(true);
  };

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth", { method: "DELETE" });
    localStorage.removeItem("auth_verified");
    setAuthenticated(false);
  }, []);

  if (checking) return null;
  if (!authenticated) return <LoginGate onLogin={handleLogin} />;

  return (
    <ChatProvider>
      <div className="h-[100dvh] flex flex-col pt-16">
        <ChatMessages />
        <ChatInput onLogout={handleLogout} />
      </div>
    </ChatProvider>
  );
}
