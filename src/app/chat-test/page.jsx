'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

import ChatExample from '@/components/examples/ChatExample';
import { MODELS } from '@/lib/models';

export default function ChatTestPage() {
  const [selectedModel, setSelectedModel] = useState('GEMMA_2B');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Chat Test</h1>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(MODELS).map(([key, model]) => (
                  <option key={key} value={key}>
                    {model.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              This is a test page for our AI chat implementation using Hugging Face models. You can
              select different models from the dropdown above to test their responses.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <ChatExample model={selectedModel} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Available Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(MODELS).map(([key, model]) => (
              <div key={key} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{model.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Max Tokens: {model.defaultMaxTokens}</p>
                  <p>Temperature: {model.temperature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
