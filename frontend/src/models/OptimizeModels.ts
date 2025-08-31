import { AIModelConfig } from "./AIModels";

export interface OptimizeRequest {
    style: string;
    markdown: string;
    aiModelConfig: AIModelConfig;
}

export interface StreamChunk {
    content: string;
    done: boolean;
}