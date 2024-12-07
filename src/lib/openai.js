/* eslint-disable @typescript-eslint/no-unused-vars */
import { OpenAI } from 'openai';

import { MODELS } from './models';

// Initialize the OpenAI client
const client = new OpenAI({
  baseURL: 'https://api-inference.huggingface.co/v1/',
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

/**
 * Gets the model configuration
 * @param {string} modelName - Name of the model to use
 * @returns {Object} Model configuration
 */
const getModelConfig = (modelName) => {
  return MODELS[modelName] || MODELS.GEMMA_2B;
};

/**
 * Streams a chat completion from the model
 */
export async function streamChatCompletion(prompt, onChunk, options = {}) {
  let fullResponse = '';
  const modelConfig = getModelConfig(options.model || 'GEMMA_2B');

  const stream = await client.chat.completions.create({
    model: modelConfig.name,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: options.maxTokens || modelConfig.defaultMaxTokens,
    temperature: options.temperature || modelConfig.temperature,
    stream: true,
    ...options,
  });

  for await (const chunk of stream) {
    if (chunk.choices && chunk.choices.length > 0) {
      const newContent = chunk.choices[0].delta.content;
      if (newContent) {
        fullResponse += newContent;
        if (onChunk) onChunk(newContent);
      }
    }
  }

  return fullResponse;
}
