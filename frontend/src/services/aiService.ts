import { AxiosResponse } from "axios";
import aiClient from "./api";

export interface OptimizeRequest {
    markdown: string,
    style: string,
    language?: string,
}

export interface OptimizeResponse {
    optimizedMarkdown: string;
}

export class AIService {
    async optimizeMarkdown(request: OptimizeRequest): Promise<AxiosResponse<OptimizeResponse>> {
        return aiClient.post<OptimizeResponse>("/api/optimize", request)
    }
}

export const aiService = new AIService();