/**
 * TypeScript type definitions for the application
 */

import { ReactNode } from 'react';

// User types
export interface User {
  id: number;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

// Chat types
export interface ChatMessage {
  id?: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
  isTyping?: boolean;
}

export interface ChatRequest {
  content: string;
}

export interface ChatResponse {
  response: string;
  chat_id?: number;
}

// File types
export interface FileUpload {
  file: File;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface SummarizationRequest {
  text: string;
  max_length?: number;
  min_length?: number;
}

export interface SummarizationResponse {
  summary: string;
  original_length: number;
  summary_length: number;
}

export interface FileSummarizationResponse extends SummarizationResponse {
  filename: string;
}

// API types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface ApiError {
  detail: string;
  status_code: number;
}

// Component props types
export interface ButtonProps {
  children: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  [key: string]: any; // For additional props
}

export interface InputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  type?: 'text' | 'password' | 'email';
  className?: string;
  label?: string;
  [key: string]: any; // For additional props
}

export interface TextareaProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  label?: string;
  rows?: number;
  maxLength?: number;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  [key: string]: any; // For additional props
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  footer?: ReactNode;
  [key: string]: any; // For additional props
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
}

// Chat component props
export interface ChatContainerProps {
  messages: ChatMessage[];
  onSpeak: (text: string) => void;
  onCopy: (text: string) => void;
  onLike: (message: ChatMessage) => void;
  onDislike: (message: ChatMessage) => void;
  onRegenerate: (message: ChatMessage) => void;
  endOfMessagesRef: React.RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileUpload: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export interface ChatMessageProps {
  message: ChatMessage;
  onSpeak: (text: string) => void;
  onCopy: (text: string) => void;
  onLike: (message: ChatMessage) => void;
  onDislike: (message: ChatMessage) => void;
  onRegenerate: (message: ChatMessage) => void;
}

// App state types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  currentMessage: string;
  isRecording: boolean;
  isSpeaking: boolean;
}

// Speech recognition types
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechSynthesisOptions {
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

// Theme types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

// Page props types
export interface PageProps {
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
