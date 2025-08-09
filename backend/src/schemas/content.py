"""
Chat and content schemas for API requests and responses.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ChatRequest(BaseModel):
    """Schema for chat request."""
    content: str


class ChatResponse(BaseModel):
    """Schema for chat response."""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    content: str
    response: Optional[str] = None
    created_at: datetime


class DocumentUpload(BaseModel):
    """Schema for document upload."""
    filename: str
    content: str
    file_type: str


class DocumentResponse(BaseModel):
    """Schema for document response."""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    filename: str
    file_type: str
    file_size: Optional[int] = None
    summary: Optional[str] = None
    created_at: datetime


class SummarizationRequest(BaseModel):
    """Schema for text summarization request."""
    text: str
    max_length: Optional[int] = 150
    min_length: Optional[int] = 30


class SummarizationResponse(BaseModel):
    """Schema for text summarization response."""
    summary: str
    original_length: int
    summary_length: int


class ImageData(BaseModel):
    """Schema for image data."""
    image_data: str
