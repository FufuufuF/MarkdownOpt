from pydantic import BaseModel

class OptResponse(BaseModel):
    optimizedContent: str
    useToken: int