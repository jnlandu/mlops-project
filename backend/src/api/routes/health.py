"""
Health check and monitoring routes.
"""
from fastapi import APIRouter
from datetime import datetime
from ...core.config import settings

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "app_name": settings.app_name,
        "version": settings.app_version
    }


@router.get("/status")
async def get_status():
    """Get application status and configuration."""
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "debug": settings.debug,
        "database_url": settings.database_url.split("://")[0] + "://***",  # Hide credentials
        "cors_origins": settings.cors_origins,
        "services": {
            "ai_service": settings.groq_api_key != "",
            "database": True
        }
    }
