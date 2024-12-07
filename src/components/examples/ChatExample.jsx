'use client';

import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

import { streamChatCompletion } from '@/lib/openai';

export default function ChatExample({ model = 'GEMMA_2B' }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');

    try {
      await streamChatCompletion(input, (chunk) => setResponse((prev) => prev + chunk), { model });
    } catch (error) {
      console.error('Chat completion error:', error);
      setResponse('Error: Failed to get response from the AI model.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center space-x-2 text-lg font-semibold">
        <MessageCircle className="w-6 h-6" />
        <h2>Chat with AI</h2>
      </div>

      <div className="border rounded-lg p-4 min-h-[200px] bg-white shadow-sm">
        {response ? (
          <div className="prose max-w-none">
            <p>{response}</p>
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-8">Ask a question to get started</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{isLoading ? 'Sending...' : 'Send'}</span>
        </button>
      </form>
    </div>
  );
}
