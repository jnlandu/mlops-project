"""
File processing service for handling document uploads and text extraction.
"""
import os
import mimetypes
from typing import Tuple, Optional
from pathlib import Path
import PyPDF2
from PIL import Image
import pytesseract
from ..core.config import settings


class FileService:
    """Service class for file processing."""
    
    @staticmethod
    def validate_file(filename: str, file_content: bytes) -> Tuple[bool, str]:
        """
        Validate uploaded file.
        
        Args:
            filename: Name of the file
            file_content: File content as bytes
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        # Check file size
        if len(file_content) > settings.max_file_size:
            return False, f"File size exceeds maximum allowed size of {settings.max_file_size} bytes"
        
        # Check file extension
        allowed_extensions = {'.txt', '.pdf', '.png', '.jpg', '.jpeg'}
        file_extension = Path(filename).suffix.lower()
        
        if file_extension not in allowed_extensions:
            return False, f"File type {file_extension} not supported. Allowed types: {', '.join(allowed_extensions)}"
        
        return True, ""
    
    @staticmethod
    def extract_text_from_file(filename: str, file_content: bytes) -> str:
        """
        Extract text from uploaded file.
        
        Args:
            filename: Name of the file
            file_content: File content as bytes
            
        Returns:
            Extracted text
        """
        file_extension = Path(filename).suffix.lower()
        
        if file_extension == '.txt':
            return FileService._extract_text_from_txt(file_content)
        elif file_extension == '.pdf':
            return FileService._extract_text_from_pdf(file_content)
        elif file_extension in {'.png', '.jpg', '.jpeg'}:
            return FileService._extract_text_from_image(file_content)
        else:
            raise ValueError(f"Unsupported file type: {file_extension}")
    
    @staticmethod
    def _extract_text_from_txt(file_content: bytes) -> str:
        """Extract text from TXT file."""
        try:
            return file_content.decode('utf-8')
        except UnicodeDecodeError:
            # Try with different encoding
            try:
                return file_content.decode('latin-1')
            except UnicodeDecodeError:
                raise ValueError("Unable to decode text file")
    
    @staticmethod
    def _extract_text_from_pdf(file_content: bytes) -> str:
        """Extract text from PDF file."""
        try:
            from io import BytesIO
            pdf_reader = PyPDF2.PdfReader(BytesIO(file_content))
            text = ""
            
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            if not text.strip():
                raise ValueError("No text found in PDF")
            
            return text.strip()
        except Exception as e:
            raise ValueError(f"Error extracting text from PDF: {str(e)}")
    
    @staticmethod
    def _extract_text_from_image(file_content: bytes) -> str:
        """Extract text from image using OCR."""
        try:
            from io import BytesIO
            image = Image.open(BytesIO(file_content))
            
            # Use pytesseract for OCR
            text = pytesseract.image_to_string(image)
            
            if not text.strip():
                raise ValueError("No text found in image")
            
            return text.strip()
        except Exception as e:
            raise ValueError(f"Error extracting text from image: {str(e)}")
    
    @staticmethod
    def save_file(filename: str, file_content: bytes) -> str:
        """
        Save file to upload directory.
        
        Args:
            filename: Name of the file
            file_content: File content as bytes
            
        Returns:
            Path to saved file
        """
        # Create upload directory if it doesn't exist
        upload_path = Path(settings.upload_dir)
        upload_path.mkdir(exist_ok=True)
        
        # Generate unique filename
        file_path = upload_path / filename
        counter = 1
        
        while file_path.exists():
            name, ext = os.path.splitext(filename)
            file_path = upload_path / f"{name}_{counter}{ext}"
            counter += 1
        
        # Save file
        with open(file_path, 'wb') as f:
            f.write(file_content)
        
        return str(file_path)
