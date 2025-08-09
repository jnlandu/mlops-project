# -------------------- main file --------------------
# This file is the main entry point for the FastAPI application.
# It sets up the FastAPI app, includes routers, and defines the root endpoint.
# It also imports necessary modules and initializes the application.
# ------------------------------------------------------



from fastapi.staticfiles import StaticFiles
from fastapi.responses import (
    HTMLResponse,
    JSONResponse,
    Response,
    FileResponse,
)

#  Personal imports 
from app.app import app
from routers import (
    auth,
    get_users,
    count_users,
    chat,
    monitor_model,
    file_upload,
    predict
) 


@app.get("/")
def index() -> HTMLResponse:
    return HTMLResponse('<h1><i>Evidently + FastAPI</i></h1>')


app.include_router(auth.router)
app.include_router(get_users.router)
app.include_router(count_users.router)
app.include_router(chat.router)
app.include_router(monitor_model.router)
app.include_router(file_upload.router)
app.include_router(predict.router)


print("Server is running correctly")


