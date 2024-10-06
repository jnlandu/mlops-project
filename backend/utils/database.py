import os 

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



BASE_DIR = os.path.dirname(os.path.realpath(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, 'okapi_app.db')
SQL_ALCHEMY_DATABASE_URL= f'sqlite:///{DATABASE_PATH}'


engine = create_engine(SQL_ALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base.metadata.create_all(bind=engine)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
