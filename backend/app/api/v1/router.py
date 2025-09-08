from fastapi import APIRouter
from .endpoints import optimize
from app.core.config import APIRoutes

api_router = APIRouter()

api_router.include_router(
    optimize.router,
    prefix=APIRoutes.Optimize.PREFIX,
    tags=["optimization"]
)