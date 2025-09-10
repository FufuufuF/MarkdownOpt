import { AIModelConfig } from "./AIModels";

export interface OptimizeRequest {
    style: string;
    markdown: string;
    aiModelConfig: AIModelConfig;
}

export interface LLMResponse {
    content: string;
    useTokens: number;
}

export interface StreamChunk {
    content: string;
    done: boolean;
}