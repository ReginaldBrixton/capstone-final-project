import { OpenAI } from "openai";
import { getModelConfig } from "./models";

// Initialize the OpenAI client
const client = new OpenAI({
    baseURL: "https://api-inference.huggingface.co/v1/",
    apiKey: process.env.HUGGINGFACE_API_KEY // Using environment variable for security
});

/**
 * Streams a chat completion from the model
 * @param {string} prompt - The user's input prompt
 * @param {function} onChunk - Callback function to handle each chunk of the stream
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} The complete response
 */
export async function streamChatCompletion(prompt, onChunk, options = {}) {
    let fullResponse = "";
    const modelConfig = getModelConfig(options.model || 'GEMMA_2B');

    const stream = await client.chat.completions.create({
        model: modelConfig.name,
        messages: [
            {
                role: "user", 
                content: prompt
            }
        ],
        max_tokens: options.maxTokens || modelConfig.defaultMaxTokens,
        temperature: options.temperature || modelConfig.temperature,
        stream: true,
        ...options
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