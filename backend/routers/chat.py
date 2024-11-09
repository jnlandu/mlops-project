from fastapi import APIRouter
from fastapi import HTTPException
from utils.api import Client
from utils.deps import db_dependency, user_dependency
from utils.models import ChatRequest


router = APIRouter(
    prefix='/chat',
    tags=['Summarize or Chat']
)

# roles = ["system", "user", "assistant"]

chat_history = []

@router.post('/')
async def chat(
      db: db_dependency, user: user_dependency, 
      chat_request: ChatRequest,
     
):
    try:
            stream = Client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a wise  assistant. Your name is Okapi. You are helping a user with a question.\
                        You will answer the user in the best way possible. You will be polite and respectful.\
                        You will use the language of the user, that is if it is English, you will use English, if it is French, you will use French.",
                    },
                    {
                        "role": "user",
                        "content": chat_request.content,
                    },
                ],
                temperature=0.1,
                max_tokens=8192,
                top_p=1,
                stop= None,
                # model="mixtral-8x7b-32768",
                 model="llama3-8b-8192",
            )
            for chunk in stream.choices:
                if chunk.message.role == "assistant":
                    response_message = chunk.message.content
                    chat_history.append(chat_request.content) 
                    return {"response": response_message}
            # response_message = stream.choices[0].message.content
            # chat_history.append(chat_request.content)  # Store user message
            # chat_history.append(response_message)  # Store AI response
            # return {"response": response_message}
   
   
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")