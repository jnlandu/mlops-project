# -------------------- app.py --------------------
# This file contains the FastAPI application instance and its configuration.
# It sets up the application, including middleware and CORS settings.
# It also imports necessary modules and initializes the application.
# ------------------------------------------------------

import os 

from fastapi import  FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from  utils.database import Base, engine
from dotenv import load_dotenv
from starlette.middleware.base import BaseHTTPMiddleware

load_dotenv()

app = FastAPI()


# from fastapi import FastAPI
# from starlette.responses import Response

# app = FastAPI()

class ForceHTTPS(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Modify the scheme to HTTPS
        request.scope['scheme'] = 'https'
        response = await call_next(request)
        return response


# app.add_middleware(ForceHTTPS)
# @app.middleware("http")
# async def add_csp_header(request, call_next):
#     response = await call_next(request)
#     # Adding Content-Security-Policy to block or upgrade mixed content
#     response.headers["Content-Security-Policy"] = "default-src 'self'; upgrade-insecure-requests; block-all-mixed-content"
#     return response



# For cross plateform: the CORSMiddleware to allow requests from the frontend
origins = [
    "https://mlops-project-3repcia0n-jeremies-projects-257f201c.vercel.app", 
    "https://mlops-project-taupe.vercel.app/",# for production
    "http://localhost:3000", # for local development
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"]
)
