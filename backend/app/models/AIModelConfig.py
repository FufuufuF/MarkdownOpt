from pydantic import BaseModel
from typing import Optional

class AIModelConfig(BaseModel):
    modelName: str
    provider: str
    apiKey: str
    prompt: Optional[str] = ""
    temperature: Optional[float] = 0.7
    maxTokens: Optional[int] = 1024
    baseURL: Optional[str]