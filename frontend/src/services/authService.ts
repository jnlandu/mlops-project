/**
 * Authentication service
 */

import apiClient, { handleApiError, createFormData } from '../utils/api';
import { API_CONFIG, LOCAL_STORAGE_KEYS } from '../utils/config';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthToken, 
  User 
} from '../types';

interface LoginResponse extends AuthToken {
  username: string;
}

export class AuthService {
  /**
   * Login user
   */
  static async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const formData = createFormData({ username, password });
      
      const response = await apiClient.post<AuthToken>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN, 
        formData, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, token_type } = response.data;
      
      // Store token and user info
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, access_token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, username);
      
      // Set default authorization header
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { access_token, token_type, username };
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Register new user
   */
  static async register(username: string, password: string): Promise<User> {
    try {
      const response = await apiClient.post<User>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        username,
        password,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Get current user information
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>(API_CONFIG.ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error: any) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Logout user
   */
  static logout(): void {
    // Clear stored data
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    
    // Remove authorization header
    delete apiClient.defaults.headers.common['Authorization'];
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    return !!token;
  }

  /**
   * Get stored token
   */
  static getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  /**
   * Get stored username
   */
  static getUsername(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  }

  /**
   * Initialize auth state from storage
   */
  static initializeAuth(): boolean {
    const token = this.getToken();
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    return false;
  }
}
