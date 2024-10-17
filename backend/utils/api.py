
import os
from groq import Groq
from pydantic import BaseModel
from dotenv import load_dotenv



load_dotenv()

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")


Client = Groq(api_key = GROQ_API_KEY)

# class ChatRequest(BaseModel):
#     content: str

# class SummarizationRequest(BaseModel):
#     content: str