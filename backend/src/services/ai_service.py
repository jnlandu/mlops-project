"""
AI/ML service for text summarization and processing.
"""
import os
from typing import Optional
from groq import Groq
from ..core.config import settings


class SummarizationService:
    """Service class for text summarization."""
    
    def __init__(self):
        """Initialize the summarization service."""
        if not settings.groq_api_key:
            raise ValueError("GROQ_API_KEY is required for summarization service")
        
        self.client = Groq(api_key=settings.groq_api_key)
        self.model_name = settings.model_name
    
    def summarize_text(
        self, 
        text: str, 
        max_length: Optional[int] = None,
        min_length: Optional[int] = None
    ) -> str:
        """
        Summarize the given text using Groq AI.
        
        Args:
            text: The text to summarize
            max_length: Maximum length of summary (optional)
            min_length: Minimum length of summary (optional)
            
        Returns:
            Summarized text
        """
        if not text.strip():
            raise ValueError("Text cannot be empty")
        
        # Build the prompt
        prompt = f"Please provide a concise summary of the following text:\n\n{text}\n\nSummary:"
        
        if max_length or min_length:
            length_instruction = "The summary should be "
            if min_length:
                length_instruction += f"at least {min_length} words"
            if max_length:
                if min_length:
                    length_instruction += f" and at most {max_length} words"
                else:
                    length_instruction += f"at most {max_length} words"
            prompt = length_instruction + ". " + prompt
        
        try:
            # Make API call to Groq
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates concise and accurate summaries of text."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model=self.model_name,
                max_tokens=settings.max_tokens,
                temperature=0.3
            )
            
            summary = chat_completion.choices[0].message.content.strip()
            return summary
            
        except Exception as e:
            raise Exception(f"Error during summarization: {str(e)}")
    
    def chat_response(self, user_message: str, context: Optional[str] = None) -> str:
        """
        Generate a chat response using Groq AI.
        
        Args:
            user_message: The user's message
            context: Optional context for the conversation
            
        Returns:
            AI response
        """
        if not user_message.strip():
            raise ValueError("Message cannot be empty")
        
        messages = [
            {
                "role": "system",
                "content": "You are a helpful assistant for a text summarization application. You can help users with their questions and provide information about text processing."
            }
        ]
        
        if context:
            messages.append({
                "role": "system",
                "content": f"Additional context: {context}"
            })
        
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        try:
            chat_completion = self.client.chat.completions.create(
                messages=messages,
                model=self.model_name,
                max_tokens=settings.max_tokens,
                temperature=0.7
            )
            
            response = chat_completion.choices[0].message.content.strip()
            return response
            
        except Exception as e:
            raise Exception(f"Error during chat response: {str(e)}")


# Global service instance
summarization_service = SummarizationService() if settings.groq_api_key else None
