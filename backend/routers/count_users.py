from fastapi import APIRouter
from utils.deps import db_dependency
from utils.models import User


router = APIRouter(
    prefix='/users_count',
    tags=['Get the totoal number  users']
)


@router.get('/')
def read_users_count(db=db_dependency):
    count = db.query(User).count()
    return count