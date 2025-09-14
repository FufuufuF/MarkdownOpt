export interface OptimizeRequest {
    style: string;
    markdown: string;
    
    modelName: string;
    provider: string;
    apiKey: string;
    maxTokens?: number;
    temperature?: number;
    baseUrl?: string;
    prompt?: string;
}

export interface LLMResponse {
    content: string;
    useTokens: number;
}

export interface StreamChunk {
    content: string;
    done: boolean;
}