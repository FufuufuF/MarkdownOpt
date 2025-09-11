from pydantic import BaseModel
from typing import Optional

class OptResponse(BaseModel):
    content: str
    useToken: int
    
class OptRequest(BaseModel):
    modelName: str
    provider: str
    apiKey: str
    markdown: str
    temperature: Optional[float] = 0.7
    maxTokens: Optional[int] = 1024
    baseURL: Optional[str]
    
    prompt: Optional[str] = ""
    style: str