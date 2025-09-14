import { AIModelConfig } from "../models/AIModels";
import { LLMResponse, OptimizeRequest } from "../models/OptimizeModels";
import { API_CONFIG, apiRequest } from "./api";

export class AIService {
    static async optimizeWithStreamMock(
        request: OptimizeRequest,
        onChunk: (chunk: string) => void,
        onComplete: () => void,
        onError: (error: Error) => void
    ): Promise<void> {
        try {
            const mockResponse = `# 优化后的${request.style}内容

这是经过AI优化的内容，采用了${request.style}的写作风格。

## 主要改进点

1. **更好的结构** - 清晰的层次结构
2. **更流畅的语言** - 符合${request.style}特色
3. **更吸引人的表达** - 增强可读性

## 详细内容

markdown: ${request.markdown}
style: ${request.style}

通过AI优化，这段内容变得更加生动有趣，符合现代读者的阅读习惯。

### 结语

希望这个优化版本能够帮助您获得更好的阅读体验和传播效果！`;
            const words = mockResponse.split("");
            let idx = 0;
            const chunkSize = 3;

            const sendNextChunk = () => {
                if (idx < words.length) {
                    const chunk = words.slice(idx, idx + chunkSize).join("");
                    onChunk(chunk);
                    idx += chunkSize;
                    setTimeout(sendNextChunk, 100); 
                } else {
                    onComplete();
                }
            };

            setTimeout(sendNextChunk, 100);
        } catch (error) {
            onError(error);
        }
    }

    static async optimizeBatch(optRequest: OptimizeRequest): Promise<LLMResponse> {
        const endpoint = API_CONFIG.ENDPOINTS.OPTIMIZE.BATCH;
        const method = API_CONFIG.METHODS.POST;

        const body = JSON.stringify(optRequest);

        try {
            const response: LLMResponse = await apiRequest<LLMResponse>(endpoint, {
                method,
                body,
            });
            console.log("[AIService]: 收到llm回复");
            return response;
        } catch (error) {
            console.error("Optimize Batch failed: ", error);
            return {
                content: "falied",
                useTokens: 0
            } as LLMResponse;
        }
    }

    static async testHealth(aiModelConfig: AIModelConfig): Promise<boolean> {
        const endpoint = API_CONFIG.ENDPOINTS.HEALTH;
        const method = API_CONFIG.METHODS.POST;

        const body = JSON.stringify(aiModelConfig);

        try {
            const response = await apiRequest<LLMResponse>(endpoint, {
                method,
                body
            });
            console.log(response)
            return response.content === "ok";
        } catch (error) {
            console.error("Health check failed:", error);
            return false;
        }
    }
}
