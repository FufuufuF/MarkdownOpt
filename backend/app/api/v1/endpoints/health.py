from fastapi import APIRouter
from pydantic import BaseModel

from ....models.OptModels import OptResponse  # 假设 LLMResponse 对应 OptResponse
from ....models.AIModelConfig import AIModelConfig
from ....services.AIService import AIService

router = APIRouter()

@router.post("/")
async def getHealth(request: AIModelConfig) -> OptResponse:
    """
    健康检查端点
    接收 AIModelConfig，测试 LLM 是否可用
    """
    try:
        isHealth = await AIService.testHealth(request=request)
        
        # 返回响应
        status = "ok" if isHealth else "failed"
        return OptResponse(
            content=status,
            useToken=0
        )
    except Exception as e:
        # 处理异常，返回失败状态
        return OptResponse(
            content=status,
            useToken=0
        )
