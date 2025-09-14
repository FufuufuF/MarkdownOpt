from fastapi import APIRouter
import logging

from ....models.OptModels import (OptResponse, OptRequest)
from ....models.AIModelConfig import (
    AIModelPrompt,
    AIModelConfig,
    getAIModelConfig,
    getAIModelPrompt
)
from ....services.AIService import AIService
from ....core.Exceptions import AIServiceError, ModelConfigError, NetworkError

router = APIRouter()

@router.post("/batch")
async def optimize(request: OptRequest) -> OptResponse:

    logging.debug("[optimize]: 收到前端优化请求")
    
    try:
        aiModelConfig: AIModelConfig = getAIModelConfig(request)
        aiModelPrompt: AIModelPrompt = getAIModelPrompt(request)
        
        llmResponse: OptResponse = await AIService.optimizeBatch(
            aiModelConfig, 
            aiModelPrompt
        )
        
        return llmResponse
    except ValueError as e:
        raise ModelConfigError(f"配置参数错误: {str(e)}")
    except ConnectionError:
        raise NetworkError("无法连接到AI服务")
    except Exception as e:
        raise AIServiceError(f"优化处理失败: {str(e)}")
        