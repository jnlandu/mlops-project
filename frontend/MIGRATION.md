# Frontend Migration Guide

This guide will help you migrate from the old frontend structure to the new organized architecture.

## Overview

The new frontend structure follows modern React best practices with:
- Proper separation of concerns
- Custom hooks for state management
- Reusable UI component library
- Service layer for API interactions
- TypeScript for type safety
- Centralized configuration

## Directory Structure Comparison

### Old Structure
```
app/
├── globals.css
├── layout.js
├── page.js
├── admin/
├── login/
├── register/
└── vision/
components/
├── AdminHeader.js
├── FileUploader.js
├── Predict.js
└── ...
```

### New Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── chat/         # Chat-specific components
│   ├── admin/        # Admin components
│   ├── auth/         # Authentication components
│   └── common/       # Common components
├── hooks/            # Custom React hooks
├── services/         # API service layer
├── utils/            # Utility functions
├── types/            # TypeScript definitions
└── config/           # Configuration files
```

## Migration Steps

### Step 1: Component Migration

#### 1.1 Move existing components to new structure

```bash
# UI Components (reusable)
mv components/FileUploader.js src/components/ui/FileUploader.tsx
mv components/UserModal.js src/components/ui/UserModal.tsx
mv components/PasskeyModal.js src/components/ui/PasskeyModal.tsx
mv components/OtpInput.js src/components/ui/OtpInput.tsx

# Auth Components
mv components/ProtectedRoute.js src/components/auth/ProtectedRoute.tsx

# Admin Components
mv components/AdminHeader.js src/components/admin/AdminHeader.tsx
mv components/StatCard.js src/components/admin/StatCard.tsx
mv components/ModelPerformance.js src/components/admin/ModelPerformance.tsx

# Common Components
mv components/Header.js src/components/common/Header.tsx
mv components/Footer.js src/components/common/Footer.tsx
mv components/Welcome.js src/components/common/Welcome.tsx

# Chat Components
mv components/Predict.js src/components/chat/ChatContainer.tsx
mv components/Prediction.js src/components/chat/MessageList.tsx
mv components/PredictionCamera.js src/components/chat/CameraInput.tsx
mv components/Vision.js src/components/chat/VisionChat.tsx
```

#### 1.2 Convert to TypeScript

Each component needs to be converted from JavaScript to TypeScript:

```tsx
// Before (JavaScript)
import React from 'react';

const FileUploader = ({ onFileSelect, isLoading }) => {
  // component logic
};

export default FileUploader;

// After (TypeScript)
import React from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelect, 
  isLoading 
}) => {
  // component logic
};

export default FileUploader;
```

### Step 2: Hook Integration

Replace direct API calls and state management with custom hooks:

#### 2.1 Authentication

```tsx
// Before
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

// After
import { useAuth } from '../hooks/useAuth';

const LoginComponent = () => {
  const { login, isLoading, error } = useAuth();
  
  const handleLogin = async (credentials) => {
    await login(credentials);
  };
};
```

#### 2.2 Chat Functionality

```tsx
// Before
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);

// After
import { useChat } from '../hooks/useChat';

const ChatComponent = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    error 
  } = useChat();
};
```

### Step 3: Service Layer Integration

Replace direct fetch calls with service functions:

```tsx
// Before
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});

// After
import { authService } from '../services/authService';

const response = await authService.login(credentials);
```

### Step 4: Page Migration

#### 4.1 Update App Router pages

```tsx
// app/login/page.tsx
import LoginForm from '../../src/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
```

#### 4.2 Update imports in existing pages

```tsx
// Before
import Header from '../../components/Header';
import AdminHeader from '../../components/AdminHeader';

// After
import Header from '../../src/components/common/Header';
import AdminHeader from '../../src/components/admin/AdminHeader';
```

### Step 5: Configuration Update

#### 5.1 Environment Variables

Update your `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret

# Features
NEXT_PUBLIC_ENABLE_SPEECH=true
NEXT_PUBLIC_ENABLE_CAMERA=true
```

#### 5.2 Import Path Updates

Update `jsconfig.json` or `tsconfig.json` for absolute imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

## Component Conversion Examples

### Example 1: Convert FileUploader

```tsx
// src/components/ui/FileUploader.tsx
import React, { useRef } from 'react';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  isLoading = false,
  accept = "*/*",
  multiple = false,
  className = ""
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`file-uploader ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        onClick={handleClick}
        disabled={isLoading}
        variant="primary"
        className="w-100"
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="me-2" />
            Uploading...
          </>
        ) : (
          'Choose File'
        )}
      </Button>
    </div>
  );
};

export default FileUploader;
```

### Example 2: Convert ProtectedRoute

```tsx
// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || <div>Please log in to access this page.</div>;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <div>You don't have permission to access this page.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

## Testing Migration

### 1. Component Tests

Create tests for migrated components:

```tsx
// src/components/ui/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Hook Tests

```tsx
// src/hooks/__tests__/useAuth.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

describe('useAuth', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password'
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

## Deployment Considerations

### 1. Build Process

The new structure requires updated build configuration:

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### 2. Environment Variables

Ensure all environment variables are properly set:

```bash
# Development
cp .env.local.example .env.local

# Production
# Set environment variables in your deployment platform
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Update import paths to use the new structure
2. **Type Errors**: Add proper TypeScript types to components
3. **Missing Dependencies**: Install required packages with `npm install`
4. **Build Errors**: Check TypeScript configuration and fix type issues

### Migration Checklist

- [ ] Move components to new directory structure
- [ ] Convert JavaScript files to TypeScript
- [ ] Update import statements
- [ ] Replace direct API calls with service functions
- [ ] Implement custom hooks for state management
- [ ] Update configuration files
- [ ] Test migrated components
- [ ] Update documentation

## Next Steps

After completing the migration:

1. **Performance Optimization**: Implement code splitting and lazy loading
2. **Testing**: Add comprehensive test coverage
3. **Documentation**: Update component documentation
4. **Monitoring**: Add error tracking and analytics
5. **CI/CD**: Set up automated testing and deployment

## Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
