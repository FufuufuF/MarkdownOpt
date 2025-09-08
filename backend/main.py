from app.api.v1.router import api_router
from app.core.config import settings, APIRoutes
from fastapi import FastAPI

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    debug=settings.debug
)

app.include_router(api_router, prefix=APIRoutes.V1_PREFIX)