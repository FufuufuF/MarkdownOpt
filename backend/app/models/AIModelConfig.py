from pydantic import BaseModel
from pydantic import SecretStr
from typing import Optional

from .OptModels import OptRequest
    
class AIModelConfig(BaseModel):
    modelName: str
    provider: str
    apiKey: SecretStr
    temperature: float
    maxTokens: int
    baseUrl: Optional[str]
    prompt: Optional[str]

class AIModelPrompt(BaseModel):
    markdown: str
    style: str
    
def getAIModelConfig(request: OptRequest):
    return AIModelConfig(
        modelName=request.modelName,
        provider=request.provider,
        apiKey=SecretStr(request.apiKey),
        temperature=0.7 if request.temperature == None else request.temperature,
        maxTokens=1024 if request.maxTokens == None else request.maxTokens,
        baseUrl=request.baseUrl,
        prompt=request.prompt
    )
    
def getAIModelPrompt(request: OptRequest):
    return AIModelPrompt(
        markdown=request.markdown,
        style=request.style
    )