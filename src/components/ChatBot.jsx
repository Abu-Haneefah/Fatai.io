'use client';

import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi, I am Yemi — the personal chatbot of Abdfatahi. I can answer your questions about, or help with related topics. How may I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput(''); // Clear input field
    setLoading(true);

    console.log("Sending message:", input); // Debug log

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      console.log("Received response:", data.response); // Debug log
      setMessages((prev) => [...newMessages, { role: 'assistant', content: data.response }]);
    } catch (err) {
      console.error('Error:', err); // Debug log
      setMessages((prev) => [
        ...newMessages,
        { role: 'assistant', content: 'Oops! Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 h-[500px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === 'user' ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-100 mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 p-3 rounded-lg inline-block mr-auto animate-pulse text-sm text-gray-500">
            Yemi is typing...
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          placeholder="Ask Yemi something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
