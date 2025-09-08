from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
    # 应用配置
    app_name: str = "MarkOpt Backend"
    version: str = "0.1.0"
    debug: bool = False
    
    # API配置
    api_v1_prefix: str = "/api/v1"
    
    # CORS配置
    cors_origins: List[str] = ["http://localhost:5173"]  # 添加前端端口
    
    # 服务器配置
    host: str = "0.0.0.0"
    port: int = 8080
    
settings = Settings()

# API路由常量
class APIRoutes:
    V1_PREFIX = settings.api_v1_prefix
    
    class Optimize:
        PREFIX = "/optimize"
        BATCH = "/batch"
        STREAM = "/stream"
    
    class Health:
        PREFIX = "/health"

# 完整路径常量（用于文档或测试）
class FullAPIRoutes:
    OPTIMIZE_BATCH = f"{APIRoutes.V1_PREFIX}{APIRoutes.Optimize.PREFIX}{APIRoutes.Optimize.BATCH}"
    OPTIMIZE_STREAM = f"{APIRoutes.V1_PREFIX}{APIRoutes.Optimize.PREFIX}{APIRoutes.Optimize.STREAM}"
    HEALTH = f"{APIRoutes.V1_PREFIX}{APIRoutes.Health.PREFIX}"