from fastapi import APIRouter
from fastapi import HTTPException
from utils.api import Client
from utils.deps import db_dependency, user_dependency
from utils.models import ChatRequest


router = APIRouter(
    prefix='/chat',
    tags=['Summarize or Chat']
)

roles = ["system", "user", "assistant"]

# Dummy list to hold chat messages
chat_history = []
@router.get('/')
async def get_chat():
    return {"messages": chat_history}

@router.post('/')
async def chat(
    #   role: str,
      db: db_dependency, user: user_dependency, 
      chat_request: ChatRequest,
    #   file: UploadFile = File(...),
     
):
    #  Test chat request:
    try:
        # if   chat_request.content:
            chat_completion = Client.chat.completions.create(
                messages=[
                    {
                        "role": "assistant",
                        "content": chat_request.content,
                    }
                ],
                model="llama3-8b-8192",
            )
            response_message = chat_completion.choices[0].message.content
            chat_history.append(chat_request.content)  # Store user message
            chat_history.append(response_message)  # Store AI response
            return {"response": response_message}
   
   
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")