
import os
from huggingface_hub import InferenceClient
from pydantic import BaseModel
from dotenv import load_dotenv



load_dotenv()

HUGGINGFACE_TOKEN = os.environ.get("HUGGINGFACE_TOKEN")

client = InferenceClient(
    token=HUGGINGFACE_TOKEN,
)

# For backward compatibility
Client = client

class ChatRequest(BaseModel):
    content: str

