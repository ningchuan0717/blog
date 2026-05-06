"use client";

import ChatProvider from "./ChatProvider";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatPage() {
  return (
    <ChatProvider>
      <div className="h-[100dvh] flex flex-col pt-16">
        <ChatMessages />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}
