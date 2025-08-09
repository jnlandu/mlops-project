/**
 * API service utilities and HTTP client configuration
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG, LOCAL_STORAGE_KEYS, ERROR_MESSAGES } from './config';

// Type definitions
interface ApiError {
  detail?: string;
  message?: string;
}

interface FormDataInput {
  [key: string]: File | string | number | boolean | null | undefined;
}

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      window.location.href = '/login';
      return Promise.reject(new Error(ERROR_MESSAGES.AUTH_ERROR));
    }

    if (error.code === 'NETWORK_ERROR' || !error.response) {
      return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to handle API errors
export const handleApiError = (error: AxiosError<ApiError> | Error): string => {
  console.error('API Error:', error);
  
  if ('response' in error && error.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return ERROR_MESSAGES.UNKNOWN_ERROR;
};

// Helper function to create form data for file uploads
export const createFormData = (data: FormDataInput): FormData => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });
  
  return formData;
};
