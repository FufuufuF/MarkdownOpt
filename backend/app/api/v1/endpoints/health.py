from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ....models.OptModels import OptResponse  # 假设 LLMResponse 对应 OptResponse
from ....models.AIModelConfig import AIModelConfig
from ....services.AIService import AIService
from ....core.Exceptions import AIServiceError, NetworkError

router = APIRouter()

@router.post("/")
async def getHealth(request: AIModelConfig) -> OptResponse:
    """
    健康检查端点
    接收 AIModelConfig，测试 LLM 是否可用
    """
    try:
        isHealth = await AIService.testHealth(request=request)
        
        status = "ok" if isHealth else "failed"
        return OptResponse(
            content=status,
            useToken=0
        )
    except ConnectionError:
        raise NetworkError("无法连接到AI服务")
    except Exception as e:
        raise AIServiceError(f"健康检查失败: {str(e)}")
