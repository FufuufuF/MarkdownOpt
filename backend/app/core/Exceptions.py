from fastapi import HTTPException

class AIServiceError(HTTPException):
    def __init__(self, detail: str = "AI服务异常", status_code: int = 500):
        super().__init__(status_code=status_code, detail=detail)

class ModelConfigError(HTTPException):
    def __init__(self, detail: str = "模型配置错误", status_code: int = 400):
        super().__init__(status_code=status_code, detail=detail)

class NetworkError(HTTPException):
    def __init__(self, detail: str = "网络连接异常", status_code: int = 503):
        super().__init__(status_code=status_code, detail=detail)
