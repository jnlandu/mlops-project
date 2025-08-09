# Text Summarization API Backend

A modern FastAPI-based backend for text summarization with user authentication, file processing, and AI-powered features.

## Features

- 🔐 **User Authentication**: JWT-based authentication system
- 📝 **Text Summarization**: AI-powered text summarization using Groq
- 📄 **File Processing**: Support for TXT, PDF, and image files (OCR)
- 💬 **Chat Interface**: AI chat assistant
- 📊 **User Management**: User registration and profile management
- 🏥 **Health Monitoring**: Built-in health checks and status endpoints
- 🚀 **Modern Architecture**: Clean architecture with proper separation of concerns

## Technology Stack

- **Framework**: FastAPI
- **Database**: SQLAlchemy with SQLite (configurable)
- **Authentication**: JWT with python-jose
- **AI/ML**: Groq API for text processing
- **File Processing**: PyPDF2, Pillow, pytesseract for OCR
- **Containerization**: Docker

## Project Structure

```
backend/
├── src/
│   ├── api/
│   │   └── routes/          # API route handlers
│   ├── core/
│   │   ├── config.py        # Application configuration
│   │   ├── database.py      # Database setup and connection
│   │   └── security.py      # Authentication and security utilities
│   ├── models/              # SQLAlchemy database models
│   ├── schemas/             # Pydantic schemas for API
│   ├── services/            # Business logic layer
│   └── main.py              # FastAPI application entry point
├── tests/                   # Test files
├── uploads/                 # File upload directory
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration
└── .env.example            # Environment variables template
```

## Quick Start

### Prerequisites

- Python 3.10+
- pip or poetry
- (Optional) Docker

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the application**
   ```bash
   uvicorn src.main:app --reload
   ```

The API will be available at `http://localhost:8000`

### Docker Setup

1. **Build the image**
   ```bash
   docker build -t text-summarization-api .
   ```

2. **Run the container**
   ```bash
   docker run -p 8000:8000 --env-file .env text-summarization-api
   ```

## API Documentation

Once the application is running, you can access:

- **Interactive API Docs**: http://localhost:8000/docs
- **ReDoc Documentation**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/api/health

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_NAME` | Application name | Text Summarization API |
| `APP_VERSION` | Application version | 1.0.0 |
| `DEBUG` | Debug mode | False |
| `HOST` | Server host | 0.0.0.0 |
| `PORT` | Server port | 8000 |
| `DATABASE_URL` | Database connection URL | sqlite:///./app.db |
| `AUTH_SECRET_KEY` | JWT secret key | (required) |
| `GROQ_API_KEY` | Groq API key for AI features | (required) |
| `MAX_FILE_SIZE` | Maximum file upload size | 10485760 (10MB) |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/token` - Login and get access token
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users/` - Get all users (paginated)
- `GET /api/users/count` - Get user count
- `GET /api/users/{user_id}` - Get user by ID

### AI Services
- `POST /api/ai/summarize` - Summarize text
- `POST /api/ai/summarize/file` - Summarize uploaded file
- `POST /api/ai/chat` - Chat with AI assistant

### Health
- `GET /api/health/` - Health check
- `GET /api/health/status` - Application status

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black src/
isort src/
```

### Type Checking
```bash
mypy src/
```

## Deployment

### Production Considerations

1. **Security**
   - Use strong, unique `AUTH_SECRET_KEY`
   - Enable HTTPS
   - Configure proper CORS origins
   - Use environment variables for secrets

2. **Database**
   - Consider PostgreSQL for production
   - Set up database migrations
   - Configure connection pooling

3. **Monitoring**
   - Set up logging
   - Configure health checks
   - Monitor API performance

### Docker Compose Example

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/dbname
      - GROQ_API_KEY=${GROQ_API_KEY}
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=textsum
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
