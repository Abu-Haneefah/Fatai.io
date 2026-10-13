"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Yemi — the personal AI assistant for Jabar Fatai. I can answer your questions about Jabar's skills, experience, or projects. How may I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    const userPrompt = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userPrompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I'm here to help! Jabar is a Frontend Developer with 3+ years of experience in React, Next.js, and TypeScript. You can contact him at aabdfatahi@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 w-full">
      <Card className="bg-white/95 border-slate-200 shadow-xl overflow-hidden rounded-2xl">
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center gap-2 border-b border-slate-800">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-sm">Yemi AI &bull; Assistant</span>
        </div>
        <CardContent className="p-4 space-y-4 h-[420px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-slate-900 text-white rounded-br-xs"
                    : "bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl w-fit">
              <Bot className="w-4 h-4 text-slate-400 animate-spin" />
              <span>Yemi is thinking...</span>
            </div>
          )}
        </CardContent>
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
          <Input
            type="text"
            placeholder="Ask anything about Jabar Fatai's projects & skills..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white"
          />
          <Button onClick={sendMessage} disabled={loading} size="icon" className="shrink-0 rounded-xl">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;
