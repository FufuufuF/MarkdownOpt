export interface ModelInfo {
    id: string;
    modelName: string;
    provider: string;
    apiKey: string;
    maxTokens?: number;
    temperature?: number;
    baseUrl?: string;
    prompt?: string;
    timestamp: number;
}

export interface AIModelConfig {
    modelName: string;
    provider: string;
    apiKey: string;
    maxTokens?: number;
    temperature?: number;
    baseUrl?: string;
    prompt?: string;
}

export function converModelInfoToAIModelConfig (modelInfo: ModelInfo): AIModelConfig {
    return {
        modelName: modelInfo.modelName,
        provider: modelInfo.provider,
        apiKey: modelInfo.apiKey,
        maxTokens: modelInfo.maxTokens,
        temperature: modelInfo.temperature,
        baseUrl: modelInfo.baseUrl,
        prompt: modelInfo.prompt
    };
}