# Use the official Python image as a base
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /backend

# Copy the requirements file to the working directory

COPY ./backend/requirements.txt /backend/requirements.txt

RUN pip install --upgrade pip
RUN pip install "fastapi[standard]"

RUN pip install --no-cache-dir -r /backend/requirements.txt

COPY ./backend/app /backend/app
COPY ./backend/routers /backend/routers
COPY ./backend/tests /backend/tests
COPY ./backend/tests /backend/tests
COPY ./backend/utils /backend/utils

# Copy the application backend

EXPOSE 8000

# Command to run the FastAPI app with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
