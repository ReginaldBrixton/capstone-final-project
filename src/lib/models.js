/**
 * Configuration for different AI models
 */

export const MODELS = {
    GEMMA_2B: {
        name: "google/gemma-2-2b-it",
        defaultMaxTokens: 500,
        temperature: 0.7,
        description: "Google's 2B parameter instruction-tuned Gemma model"
    },
    QWQ_32B: {
        name: "Qwen/QwQ-32B-Preview",
        defaultMaxTokens: 500,
        temperature: 0.7,
        description: "High-performance 32B parameter model from Qwen"
    },
    LLAMA_3: {
        name: "meta-llama/Llama-3.2-3B-Instruct",
        defaultMaxTokens: 500,
        temperature: 0.7,
        description: "Meta's Llama 3.2 3B instruction-tuned model"
    },
    SMOL_LM: {
        name: "HuggingFaceTB/SmolLM2-1.7B-Instruct",
        defaultMaxTokens: 500,
        temperature: 0.7,
        description: "Lightweight 1.7B instruction-tuned model"
    },
    MISTRAL_NEMO: {
        name: "mistralai/Mistral-Nemo-Instruct-2407",
        defaultMaxTokens: 500,
        temperature: 0.7,
        description: "Mistral's instruction-tuned Nemo model"
    },
    MISTRAL_7B: {
        name: "mistralai/Mistral-7B-Instruct-v0.2",
        defaultMaxTokens: 500,
        temperature: 0.7,
        description: "Mistral's 7B parameter instruction-tuned model"
    }
};

/**
 * Get model configuration by key
 * @param {string} modelKey - The key of the model in MODELS object
 * @returns {Object} Model configuration
 */
export function getModelConfig(modelKey) {
    const config = MODELS[modelKey];
    if (!config) {
        throw new Error(`Model configuration not found for key: ${modelKey}`);
    }
    return config;
}