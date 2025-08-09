"""
Core configuration and settings for the application.
"""
import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings."""
    
    # App Configuration
    app_name: str = Field(default="Text Summarization API", description="Application name")
    app_version: str = Field(default="1.0.0", description="Application version")
    debug: bool = Field(default=False, description="Debug mode")
    
    # Server Configuration
    host: str = Field(default="0.0.0.0", description="Server host")
    port: int = Field(default=8000, description="Server port")
    
    # Database Configuration
    database_url: str = Field(
        default="sqlite:///./app.db",
        description="Database URL"
    )
    
    # Authentication
    auth_secret_key: str = Field(
        default="your-secret-key-here-change-in-production",
        description="JWT secret key"
    )
    auth_algorithm: str = Field(default="HS256", description="JWT algorithm")
    access_token_expire_minutes: int = Field(
        default=30, 
        description="Access token expiration time in minutes"
    )
    
    # CORS Settings
    cors_origins: List[str] = Field(
        default=[
            "http://localhost:3000",
            "https://mlops-project-3repcia0n-jeremies-projects-257f201c.vercel.app",
            "https://mlops-project-taupe.vercel.app"
        ],
        description="Allowed CORS origins"
    )
    
    # AI/ML Configuration
    groq_api_key: str = Field(default="", description="Groq API key")
    model_name: str = Field(default="llama3-8b-8192", description="Default model name")
    max_tokens: int = Field(default=1000, description="Maximum tokens for generation")
    
    # File Upload
    max_file_size: int = Field(default=10 * 1024 * 1024, description="Max file size in bytes (10MB)")
    upload_dir: str = Field(default="uploads", description="Upload directory")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


# Global settings instance
settings = Settings()
