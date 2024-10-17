from fastapi import  File, UploadFile, APIRouter
from utils.deps import db_dependency, user_dependency


router = APIRouter(
    prefix='/upload',
    tags=['Image Classification']
)

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    # Here you can save the file and/or pass it to your classification model
    contents = await file.read()
    # Save file or process it for classification
    return {"filename": file.filename, "content_type": file.content_type}
