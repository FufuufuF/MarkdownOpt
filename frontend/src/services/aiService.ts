import { OptimizeRequest } from "../models/OptimizeModels";
import { API_CONFIG } from "./api";

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
aiModelConfig: ${JSON.stringify(request.aiModelConfig)}

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
                    setTimeout(sendNextChunk, 100); // Simulate streaming delay
                } else {
                    onComplete();
                }
            };

            setTimeout(sendNextChunk, 100);
        } catch (error) {
            onError(error);
        }
    }

    static async optimizeBatch(
        request: OptimizeRequest,
        onChunk: (chunk: string) => void,
        onComplete: () => void,
        onError: (error: Error) => void
    ): Promise<void> {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.OPTIMIZE.BATCH;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            onError(new Error(`HTTP error! status: ${response.status}`));
            return;
        }

        const text = await response.text();
        onChunk(text);
        onComplete();
    }
}
