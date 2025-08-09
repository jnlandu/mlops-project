from fastapi import APIRouter
from fastapi import HTTPException
from utils.api import Client, ChatRequest
from utils.deps import db_dependency, user_dependency
# import markdown as md


router = APIRouter(
    prefix='/chat',
    tags=['Summarize or Chat']
)

# Dummy list to hold chat messages
chat_history = []

@router.post('/')
async def chat(
      db: db_dependency, user: user_dependency, 
      chat_request: ChatRequest,
    #   file: UploadFile = File(...),
     
):
    #  Test chat request:
    try:
        # if   chat_request.content:
            stream = Client.chat.completions.create(
                 messages=[
                    {
                        "role": "system",
                        "content": "You are a wise  assistant. Your name is Okapi. You are helping a user with a question.",
                    },
                    {
                        "role": "user",
                        "content": chat_request.content,
                    },
                ],
                # temperature=0.1,
                # max_tokens=524,
                # top_p=1,
                # stop= None,
                # model="mixtral-8x7b-32768",  # Groq model - commented out
                model="HuggingFaceTB/SmolLM3-3B",  # Hugging Face model that works
                # stream=True,
            )

            # def stream_response():
            #     for chunk in stream:
            #         content = chunk.choices[0].delta.content
            #         if content:
            #             yield {"response": content}

            # prettified_output = ""
            # for message in stream_response():
            #     prettified_output += md.convert(message["response"]) + "\n"

            # return {"response": prettified_output}

            # stream_messages = []
            # for chunk in stream:
            #     content = chunk.choices[0].delta.content
            #     if content:
            #         stream_messages.append(content)
            #         yield {"response": [ word  for word in stream_messages]}  # Yield content for streaming
            # # all_messages = [message for message in stream]
            # all_messages = []
            # for message in stream:
            #     all_messages.append(message.choices[0].delta.content)

            # print("Debugging all_messages", all_messages)   
            # return {"response": all_messages}

            response_message = stream.choices[0].message.content
            chat_history.append(chat_request.content)  # Store user message
            chat_history.append(response_message)  # Store AI response
            return {"response": response_message}
   
   
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")
    
