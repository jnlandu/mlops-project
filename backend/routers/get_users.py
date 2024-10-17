from fastapi import APIRouter
from utils.deps import db_dependency, user_dependency
from utils.models import User


router = APIRouter(
    prefix='/users',
    tags=['Get all users']
)


@router.post('/')
async def read_users(db: db_dependency, user: user_dependency):
    users = db.query(User).all()
    return {"response": users }


