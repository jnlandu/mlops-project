/**
 * Application configuration and constants
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_FASTAPI_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/token',
      REGISTER: '/api/auth/register',
      ME: '/api/auth/me',
    },
    CHAT: '/api/ai/chat',
    SUMMARIZE: '/api/ai/summarize',
    SUMMARIZE_FILE: '/api/ai/summarize/file',
    USERS: '/api/users',
    HEALTH: '/api/health',
  },
  TIMEOUT: 30000, // 30 seconds
};

export const APP_CONFIG = {
  NAME: 'OkapiChat',
  DESCRIPTION: 'A text summarization and conversational application',
  VERSION: '2.0.0',
  AUTHOR: 'Your Name',
  MAX_MESSAGE_LENGTH: 500,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FILE_TYPES: ['.txt', '.pdf', '.png', '.jpg', '.jpeg'],
};

export const UI_CONFIG = {
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

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  VISION: '/vision',
  PROFILE: '/profile',
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 10MB.',
  UNSUPPORTED_FILE: 'Unsupported file type.',
  MESSAGE_TOO_LONG: 'Message is too long. Maximum 500 characters allowed.',
  SPEECH_NOT_SUPPORTED: 'Speech recognition is not supported in your browser.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};
