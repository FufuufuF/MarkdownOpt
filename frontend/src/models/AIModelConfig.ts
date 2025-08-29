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