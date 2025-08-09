/**
 * Authentication hook
 */

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<any>;
  register: (username: string, password: string) => Promise<User>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async (): Promise<void> => {
    try {
      if (AuthService.initializeAuth()) {
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      AuthService.logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<any> => {
    try {
      setIsLoading(true);
      const authData = await AuthService.login(username, password);
      
      // Get user data
      const userData = await AuthService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);

      // Redirect based on user role
      if (username === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }

      return authData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string): Promise<User> => {
    try {
      setIsLoading(true);
      const userData = await AuthService.register(username, password);
      return userData;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
