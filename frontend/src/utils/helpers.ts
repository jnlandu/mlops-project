/**
 * Utility functions for various operations
 */

import { APP_CONFIG, ERROR_MESSAGES } from './config';

// Type definitions
interface FileValidation {
  isValid: boolean;
  errors: string[];
}

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate file before upload
 */
export const validateFile = (file: File): FileValidation => {
  const errors: string[] = [];
  
  // Check file size
  if (file.size > APP_CONFIG.MAX_FILE_SIZE) {
    errors.push(ERROR_MESSAGES.FILE_TOO_LARGE);
  }
  
  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!APP_CONFIG.SUPPORTED_FILE_TYPES.includes(fileExtension)) {
    errors.push(ERROR_MESSAGES.UNSUPPORTED_FILE);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Debounce function to limit function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Format date in a readable format
 */
export const formatDate = (date: string | number | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Check if user is on mobile device
 */
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (
  element: Element | null, 
  behavior: ScrollBehavior = 'smooth'
): void => {
  if (element) {
    element.scrollIntoView({ behavior });
  }
};

/**
 * Get contrast color for background
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#ffffff';
};
