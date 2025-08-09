# OkapiChat Frontend

A modern, responsive frontend for the OkapiChat text summarization and conversational AI application built with Next.js, React, and TypeScript.

## 🚀 Features

- 💬 **Real-time Chat Interface**: Interactive chat with AI-powered responses
- 📝 **Text Summarization**: Upload files (TXT, PDF, images) for AI summarization
- 🎙️ **Voice Input**: Speech-to-text functionality for hands-free interaction
- 🔊 **Text-to-Speech**: Listen to AI responses with built-in speech synthesis
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🔐 **Authentication**: Secure user authentication and session management
- 📄 **File Processing**: Support for multiple file formats with drag-and-drop
- 🎨 **Modern UI**: Clean, accessible interface with Bootstrap components
- ⚡ **Performance Optimized**: Fast loading with Next.js optimizations

## 📁 Project Structure

```
frontend/
├── src/                          # Source code (new organized structure)
│   ├── components/              # Reusable components
│   │   ├── ui/                 # Basic UI components (Button, Input, Modal, etc.)
│   │   ├── chat/               # Chat-specific components
│   │   └── layout/             # Layout components
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API service layer
│   ├── utils/                  # Utility functions and configurations
│   └── types/                  # TypeScript type definitions
├── app/                        # Next.js app directory
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   ├── page.js                # Home page (old structure)
│   ├── page-new.js            # Home page (new structure)
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   ├── admin/                 # Admin dashboard
│   └── vision/                # Vision/camera feature
├── components/                # Legacy components (to be migrated)
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript/TypeScript
- **UI Library**: React 18
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Speech**: Web Speech API
- **File Handling**: HTML5 File API with drag-and-drop

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## ⚙️ Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Backend API URL
NEXT_PUBLIC_FASTAPI_API_URL=http://localhost:8000

# Admin access
NEXT_PUBLIC_ADMIN_PASSKEY=your-admin-passkey
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint and fix issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |

## 🎨 Component Architecture

### New Organized Structure

The frontend has been reorganized with a modern, scalable architecture:

#### Core Components (`src/components/`)

- **UI Components** (`ui/`): Reusable basic components
- **Chat Components** (`chat/`): Chat-specific functionality
- **Layout Components** (`layout/`): Page layout components

#### Custom Hooks (`src/hooks/`)

- `useAuth.js` - Authentication state management
- `useChat.js` - Chat functionality and message handling
- `useSpeech.js` - Speech recognition and synthesis

#### Services (`src/services/`)

- `authService.js` - Authentication API calls
- `chatService.js` - Chat and AI API calls
- `fileService.js` - File processing utilities

#### Utilities (`src/utils/`)

- `config.js` - Application configuration
- `api.js` - HTTP client setup and interceptors
- `helpers.js` - Common utility functions

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Lazy Loading**: Dynamic imports for non-critical components
- **Caching**: Proper HTTP caching headers for static assets

## 📱 Responsive Design

The application is built with mobile-first responsive design supporting mobile, tablet, and desktop views.

## 🔒 Security

- Input sanitization
- CSRF protection
- Secure authentication token handling
- Environment variable validation

## 📦 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Vercel Deployment

The application is optimized for Vercel deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the new organized structure
4. Add tests for new features
5. Ensure code formatting and linting
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
