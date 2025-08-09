/**
 * Application configuration and constants
 */

interface ApiEndpoints {
  AUTH: {
    LOGIN: string;
    REGISTER: string;
    ME: string;
  };
  CHAT: string;
  SUMMARIZE: string;
  SUMMARIZE_FILE: string;
  USERS: string;
  HEALTH: string;
}

interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: ApiEndpoints;
  TIMEOUT: number;
}

interface AppConfig {
  NAME: string;
  DESCRIPTION: string;
  VERSION: string;
  AUTHOR: string;
  MAX_MESSAGE_LENGTH: number;
  MAX_FILE_SIZE: number;
  SUPPORTED_FILE_TYPES: string[];
}

interface UIAnimations {
  SCROLL_BEHAVIOR: ScrollBehavior;
  TYPING_SPEED: number;
}

interface SpeechConfig {
  RATE: number;
  PITCH: number;
  VOLUME: number;
  LANG: string;
}

interface ThemeConfig {
  PRIMARY: string;
  SECONDARY: string;
  SUCCESS: string;
  DANGER: string;
  WARNING: string;
  INFO: string;
}

interface UIConfig {
  ANIMATIONS: UIAnimations;
  SPEECH: SpeechConfig;
  THEME: ThemeConfig;
}

interface Routes {
  HOME: string;
  LOGIN: string;
  REGISTER: string;
  ADMIN: string;
  VISION: string;
  PROFILE: string;
}

interface LocalStorageKeys {
  TOKEN: string;
  USER: string;
  THEME: string;
  LANGUAGE: string;
}

interface ErrorMessages {
  NETWORK_ERROR: string;
  AUTH_ERROR: string;
  FILE_TOO_LARGE: string;
  UNSUPPORTED_FILE: string;
  MESSAGE_TOO_LONG: string;
  SPEECH_NOT_SUPPORTED: string;
  UNKNOWN_ERROR: string;
}

export const API_CONFIG: ApiConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_FASTAPI_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/token',
      REGISTER: '/auth/',
      ME: '/auth/me',
    },
    CHAT: '/ai/chat',
    SUMMARIZE: '/ai/summarize',
    SUMMARIZE_FILE: '/ai/summarize/file',
    USERS: '/users',
    HEALTH: '/health',
  },
  TIMEOUT: 30000, // 30 seconds
};

export const APP_CONFIG: AppConfig = {
  NAME: 'OkapiChat',
  DESCRIPTION: 'A text summarization and conversational application',
  VERSION: '2.0.0',
  AUTHOR: 'Your Name',
  MAX_MESSAGE_LENGTH: 500,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FILE_TYPES: ['.txt', '.pdf', '.png', '.jpg', '.jpeg'],
};

export const UI_CONFIG: UIConfig = {
  ANIMATIONS: {
    SCROLL_BEHAVIOR: 'smooth',
    TYPING_SPEED: 50,
  },
  SPEECH: {
    RATE: 1,
    PITCH: 1,
    VOLUME: 1,
    LANG: 'en-US',
  },
  THEME: {
    PRIMARY: '#007bff',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
  },
};

export const ROUTES: Routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  VISION: '/vision',
  PROFILE: '/profile',
};

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const ERROR_MESSAGES: ErrorMessages = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 10MB.',
  UNSUPPORTED_FILE: 'Unsupported file type.',
  MESSAGE_TOO_LONG: 'Message is too long. Maximum 500 characters allowed.',
  SPEECH_NOT_SUPPORTED: 'Speech recognition is not supported in your browser.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};
