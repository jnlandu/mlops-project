"""
Text summarization and AI routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...core.security import get_current_user
from ...schemas.content import SummarizationRequest, SummarizationResponse, ChatRequest, ChatResponse
from ...services.ai_service import summarization_service
from ...services.file_service import FileService
from ...models.user import User

router = APIRouter(prefix="/ai", tags=["AI Services"])


@router.post("/summarize", response_model=SummarizationResponse)
async def summarize_text(
    request: SummarizationRequest,
    current_user: User = Depends(get_current_user)
):
    """Summarize text using AI."""
    if not summarization_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Summarization service not available"
        )
    
    try:
        summary = summarization_service.summarize_text(
            text=request.text,
            max_length=request.max_length,
            min_length=request.min_length
        )
        
        return SummarizationResponse(
            summary=summary,
            original_length=len(request.text.split()),
            summary_length=len(summary.split())
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during summarization: {str(e)}"
        )


@router.post("/summarize/file")
async def summarize_file(
    file: UploadFile = File(...),
    max_length: int = 150,
    min_length: int = 30,
    current_user: User = Depends(get_current_user)
):
    """Summarize text from uploaded file."""
    if not summarization_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Summarization service not available"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Validate file
        is_valid, error_message = FileService.validate_file(file.filename, file_content)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_message
            )
        
        # Extract text from file
        text = FileService.extract_text_from_file(file.filename, file_content)
        
        # Summarize text
        summary = summarization_service.summarize_text(
            text=text,
            max_length=max_length,
            min_length=min_length
        )
        
        return {
            "filename": file.filename,
            "summary": summary,
            "original_length": len(text.split()),
            "summary_length": len(summary.split())
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing file: {str(e)}"
        )


@router.post("/chat")
async def chat_with_ai(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Chat with AI assistant."""
    if not summarization_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Chat service not available"
        )
    
    try:
        response = summarization_service.chat_response(request.content)
        
        # Save chat history
        from ...models.content import ChatHistory
        chat_history = ChatHistory(
            user_id=current_user.id,
            content=request.content,
            response=response
        )
        db.add(chat_history)
        db.commit()
        db.refresh(chat_history)
        
        return {
            "response": response,
            "chat_id": chat_history.id
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during chat: {str(e)}"
        )
