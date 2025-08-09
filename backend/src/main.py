"""
Main FastAPI application.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from .core.config import settings
from .core.database import create_tables
from .api.routes import auth, users, ai, health

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="A modern text summarization API with user authentication",
    version=settings.app_version,
    debug=settings.debug
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
app.include_router(health.router, prefix="/api")


@app.get("/", response_class=HTMLResponse)
async def root():
    """Root endpoint with basic information."""
    return HTMLResponse(
        content=f"""
        <html>
            <head>
                <title>{settings.app_name}</title>
                <style>
                    body {{ font-family: Arial, sans-serif; margin: 40px; }}
                    .container {{ max-width: 600px; margin: 0 auto; }}
                    .header {{ text-align: center; color: #333; }}
                    .info {{ background: #f5f5f5; padding: 20px; border-radius: 8px; }}
                    .link {{ color: #007bff; text-decoration: none; }}
                    .link:hover {{ text-decoration: underline; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="header">{settings.app_name}</h1>
                    <div class="info">
                        <p><strong>Version:</strong> {settings.app_version}</p>
                        <p><strong>Status:</strong> Running</p>
                        <p><strong>Documentation:</strong> <a href="/docs" class="link">API Docs</a></p>
                        <p><strong>Health Check:</strong> <a href="/api/health" class="link">Health Status</a></p>
                    </div>
                </div>
            </body>
        </html>
        """
    )


@app.on_event("startup")
async def startup_event():
    """Initialize the application on startup."""
    # Create database tables
    create_tables()
    print(f"🚀 {settings.app_name} v{settings.app_version} is starting up...")
    print(f"📊 Debug mode: {settings.debug}")
    print(f"🌐 CORS origins: {settings.cors_origins}")


@app.on_event("shutdown")
async def shutdown_event():
    """Clean up on application shutdown."""
    print(f"🛑 {settings.app_name} is shutting down...")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
