from fastapi import APIRouter
from .endpoints import (optimize, health)
from ...config.settings import APIRoutes

api_router = APIRouter()

api_router.include_router(
    optimize.router,
    prefix=APIRoutes.Optimize.PREFIX,
    tags=["optimization"]
)

api_router.include_router(
    health.router,
    prefix=APIRoutes.Health.PREFIX,
    tags=["health"]
)